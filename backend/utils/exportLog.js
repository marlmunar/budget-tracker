import ExcelJS from "exceljs";

const getEntries = (workbook, log) => {
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

    row.getCell("amount").numFmt = "#,##0.00;[Red]-#,##0.00";
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
};

const getSummary = (workbook, log) => {
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

    row.getCell("total").numFmt = "#,##0.00;[Red]-#,##0.00";
    row.getCell("total").font = { bold: true };
  });
};

const exportLog = async (log) => {
  const fileName = log.name;
  const workbook = new ExcelJS.Workbook();

  getEntries(workbook, log);
  getSummary(workbook, log);

  const buffer = await workbook.xlsx.writeBuffer();

  return { fileName, buffer };
};

export default exportLog;
