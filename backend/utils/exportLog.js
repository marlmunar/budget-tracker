import ExcelJS from "exceljs";

const formatHeader = (sheet) => {
  sheet.getRow(1).eachCell((cell) => {
    if (cell.value) {
      cell.font = { size: 14, bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    }
  });
};

const lockSheet = async (sheet, lockedRowCount = 1) => {
  sheet.eachRow((row) =>
    row.eachCell((cell) => {
      cell.protection = { locked: false };
    })
  );

  for (let i = 1; i <= lockedRowCount; i++) {
    const row = sheet.getRow(i);
    row.eachCell((cell) => (cell.protection = { locked: true }));
  }

  await sheet.protect("", {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    deleteColumns: false,
    deleteRows: false,
  });
};

const getEntries = (workbook, log) => {
  const sheet = workbook.addWorksheet("Entries");
  sheet.columns = [
    { header: "Expense Name", key: "name", width: 30 },
    { header: "Amount", key: "amount", width: 30 },
    { header: "Category", key: "category", width: 30 },
    { header: "Date Logged", key: "date", width: 30 },
  ];

  formatHeader(sheet);

  log.entries.forEach((entry) => {
    const row = sheet.addRow({
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

  return sheet;
};

const getSummary = (workbook, log) => {
  const sheet = workbook.addWorksheet("Summary");
  sheet.columns = [
    { header: "Category", key: "category", width: 30 },
    { header: "Type", key: "type", width: 30 },
    { header: "Total", key: "total", width: 30 },
  ];

  formatHeader(sheet);

  const summary = log.categories
    .map((cat) => {
      const total = log.entries.reduce(
        (sum, entry) =>
          entry.category.name === cat.name ? sum + +entry.amount : sum,
        0
      );
      return { category: cat.name, type: cat.type, total };
    })
    .sort((a, b) => b.total - a.total);

  summary.forEach((entry) => {
    const row = sheet.addRow({
      category: entry.category,
      type: entry.type,
      total: entry.total,
    });

    const bg =
      "FF" +
      log.categories
        .find((c) => c.name === entry.category)
        .color.replace("#", "");
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

  return sheet;
};

const getLogData = (workbook, log) => {
  const sheet = workbook.addWorksheet("Log Data");
  sheet.columns = [
    { header: "Key", key: "key", width: 30 },
    { header: "Value", key: "value", width: 30 },
  ];

  formatHeader(sheet);

  Object.keys(log.logData).forEach((key) => {
    sheet.addRow({
      key,
      value: log.logData[key] ?? "No Data",
    });
  });

  const lastRow = sheet.addRow([]);
  sheet.mergeCells(`A${lastRow.number}:D${lastRow.number}`);
  sheet.getCell(`A${lastRow.number}`).value =
    "Caution: Editing the values in this tab may lead to unwanted app behavior.";

  return sheet;
};

const exportLog = async (log) => {
  const workbook = new ExcelJS.Workbook();

  const entriesSheet = getEntries(workbook, log);
  const summarySheet = getSummary(workbook, log);
  const logDataSheet = getLogData(workbook, log);

  await lockSheet(entriesSheet, 1);
  await lockSheet(summarySheet, 1);
  await lockSheet(logDataSheet, logDataSheet.lastRow.number);

  const buffer = await workbook.xlsx.writeBuffer();
  return { fileName: log.name, buffer };
};

export default exportLog;
