import asyncHandler from "express-async-handler";
import Log from "../models/log.model.js";
import exportLog from "../utils/exportLog.js";

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
    "_id name logData categories entries updatedAt"
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
  log.logData = req.body.logData ?? log.logData;

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

  const { fileName, buffer } = await exportLog(log);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.xlsx"`
  );

  res.end(buffer);
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
