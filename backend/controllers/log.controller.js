import asyncHandler from "express-async-handler";
import Log from "../models/log.model.js";

import ExcelJS from "exceljs";

// @desc Get Logs based on UserId
// @route GET /api/logs
// @access PRIVATE
const getLogs = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(400);
    throw new Error("Bad request: UserId is missing");
  }

  const logs = await Log.find({ userId });
  res.status(200).json({
    message: "Successfully fetched",
    data: logs,
  });
});

// @desc Create Log
// @route POST /api/logs
// @access PRIVATE
const createLog = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, logData, categories } = req.body;
  const newLog = await Log.create({ userId, logData, name, categories });

  res.status(201).json({
    message: "Successfully created",
    data: newLog,
  });
});

// @desc Get Log
// @route GET  /api/logs/:id
// @access PRIVATE
const getLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const log = await Log.findById(id);

  if (!log.userId.equals(userId)) {
    res.status(400);
    throw new Error("Log is not available");
  }

  const resultLog = await Log.findById(
    id,
    "_id name logData categories entries"
  );

  res.status(200).json({
    message: "Successfully fetched",
    data: resultLog,
  });
});

// @desc Update Log
// @route PUT  /api/logs/:id
// @access PRIVATE
const updateLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const log = await Log.findById(id);

  log.name = req.body.name ?? log.name;
  log.categories = req.body.categories ?? log.categories;
  log.entries = req.body.entries ?? log.entries;

  const updatedLog = await log.save();

  res.status(200).json({
    message: "Successfully updated",
    data: updatedLog,
  });
});

// @desc Delete Log
// @route DELETE /api/logs/:id
// @access PRIVATE
const deleteLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Log.findByIdAndDelete(id);
  res.status(200).json({
    message: "Successfully deleted",
  });
});

// @desc Download Log
// @route GET /api/logs/download/:id
// @access PRIVATE
const downloadLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const log = await Log.findById(id);

  if (!log.userId.equals(userId) || log.entries.length < 1) {
    res.status(400);
    throw new Error("Log is not available");
  }
  const fileName = log.name;
  const workbook = new ExcelJS.Workbook();
  const entriesSheet = workbook.addWorksheet("Entries");
  entriesSheet.columns = [
    {
      header: "Expense Name",
      key: "name",
      width: 30,
    },
    { header: "Amount", key: "amount", width: 30 },
    { header: "Category", key: "category", width: 30 },
    { header: "Date Logged", key: "date", width: 30 },
  ];
  entriesSheet.getRow(1).eachCell((cell, rowNumber) => {
    if (cell.value) {
      cell.font = {
        size: 14,
        bold: true,
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    }
  });
  log.entries.map((entry) => {
    const row = entriesSheet.addRow({
      name: entry.expense,
      amount: entry.amount,
      category: entry.category.name,
      date: entry.date,
    });

    row.getCell("amount").numFmt = '"₱"#,##0.00;[Red]-"₱"#,##0.00';
    row.getCell("amount").font = { bold: true };

    const bg = "FF" + entry.category.color.replace("#", "");

    row.getCell("category").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: bg },
    };
    row.getCell("category").border = {
      top: { style: "thin", color: { argb: "FFFFFFFF" } },
      left: { style: "thin", color: { argb: "FFFFFFFF" } },
      bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
      right: { style: "thin", color: { argb: "FFFFFFFF" } },
    };

    row.getCell("date").numFmt = "mm/dd/yyyy";
    row.getCell("date").alignment = { horizontal: "right" };
  });

  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    {
      header: "Category",
      key: "category",
      width: 30,
    },
    { header: "Total", key: "total", width: 30 },
  ];
  summarySheet.getRow(1).eachCell((cell, rowNumber) => {
    if (cell.value) {
      cell.font = {
        size: 14,
        bold: true,
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    }
  });

  const categories = log.categories.map((cat) => cat.name);
  const summary = categories
    .map((cat) => {
      const sum = log.entries.reduce(
        (sum, entry) =>
          entry.category.name === cat ? sum + +entry.amount : sum,
        0
      );
      return {
        category: cat,
        total: sum,
      };
    })
    .sort((a, b) => b.total - a.total);
  summary.map((entry) => {
    const row = summarySheet.addRow({
      category: entry.category,
      total: entry.total,
    });

    const bgColor = log.categories.find(
      (cat) => cat.name === entry.category
    ).color;
    const bg = "FF" + bgColor.replace("#", "");

    row.getCell("category").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: bg },
    };

    row.getCell("category").border = {
      top: { style: "thin", color: { argb: "FFFFFFFF" } },
      left: { style: "thin", color: { argb: "FFFFFFFF" } },
      bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
      right: { style: "thin", color: { argb: "FFFFFFFF" } },
    };

    row.getCell("total").numFmt = '"₱"#,##0.00;[Red]-"₱"#,##0.00';
    row.getCell("total").font = { bold: true };
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.xlsx"`
  );
  await workbook.xlsx.write(res);
  res.end();
});

// @desc Import Log
// @route PORT /api/logs/import
// @access PRIVATE
const importLog = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  setTimeout(() => {
    if (!res.headersSent) {
      return res.status(400).json({ message: "Failed to import data" });
    }
  }, 5000);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(req.file.buffer);

  const worksheet = workbook.worksheets[0];
  const entries = [];
  const headerRow = worksheet.getRow(1);
  const expectedHeaders = ["Expense Name", "Amount", "Category", "Date Logged"];
  const actualHeaders = headerRow.values.slice(1);

  if (
    actualHeaders.length !== expectedHeaders.length ||
    !expectedHeaders.every((val, i) => actualHeaders[i] === val)
  ) {
    res.status(400);
    throw new Error("Invalid file content");
  }

  const entryKeys = ["expense", "amount", "category", "date"];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const entry = {};

    row.eachCell((cell, colNumber) => {
      if (colNumber === 3) {
        return (entry[entryKeys[colNumber - 1]] = {
          name: cell.value,
          color: "#" + cell.fill.fgColor.argb.slice(2),
        });
      }

      entry[entryKeys[colNumber - 1]] = cell.value;
    });
    entries.push(entry);
  });

  const summarySheet = workbook.worksheets[1];
  const categories = [];

  if (!summarySheet || summarySheet.name !== "Summary") {
    res.status(400);
    throw new Error("Invalid file content");
  }

  const categoryColumn = summarySheet.getColumn(1);
  categoryColumn.eachCell((cell, cellNumber) => {
    if (cellNumber === 1) return;

    const category = {
      name: cell.value,
      color: "#" + cell.fill.fgColor.argb.slice(2),
    };
    categories.push(category);
  });

  res.status(200).json({
    message: "Successfully imported",
    entries,
    categories,
  });
});

export {
  getLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
  downloadLog,
  importLog,
};
