import ExcelJS from "exceljs";

const validateSheet = (sheet, name, expectedHeaders, actualHeaders) => {
  const error = "Invalid file content";
  if (!sheet || sheet.name !== name) {
    throw new Error(error);
  }

  if (
    actualHeaders.length !== expectedHeaders.length ||
    !expectedHeaders.every((val, i) => actualHeaders[i] === val)
  ) {
    throw new Error(error);
  }
};

const getEntries = (workbook) => {
  const entriesSheet = workbook.worksheets[0];
  const entries = [];
  const headerRow = entriesSheet.getRow(1);
  const expectedHeaders = ["Expense Name", "Amount", "Category", "Date Logged"];
  const actualHeaders = headerRow.values.slice(1);

  validateSheet(entriesSheet, "Entries", expectedHeaders, actualHeaders);

  const entryKeys = ["expense", "amount", "category", "date"];

  entriesSheet.eachRow((row, rowNumber) => {
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

  return entries;
};

const getCategories = (workbook) => {
  const summarySheet = workbook.worksheets[1];
  const categories = [];
  const headerRow = summarySheet.getRow(1);
  const expectedHeaders = ["Category", "Type", "Total"];
  const actualHeaders = headerRow.values.slice(1);

  validateSheet(summarySheet, "Summary", expectedHeaders, actualHeaders);

  summarySheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const category = {};

    row.eachCell((cell, colNumber) => {
      if (colNumber === 1) {
        category["name"] = cell.value;
        category["color"] = "#" + cell.fill.fgColor.argb.slice(2);
        return;
      }

      if (colNumber === 2) {
        return (category["type"] = cell.value);
      }
    });
    categories.push(category);
  });

  return categories;
};

const getLogData = (workbook) => {
  const logDataSheet = workbook.worksheets[2];
  const logData = {};
  const headerRow = logDataSheet.getRow(1);
  const expectedHeaders = ["Key", "Value"];
  const actualHeaders = headerRow.values.slice(1);

  validateSheet(logDataSheet, "Log Data", expectedHeaders, actualHeaders);

  const logDataKeys = [];

  logDataSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    if (rowNumber === 6) return;

    row.eachCell((cell, colNumber) => {
      if (colNumber === 1) {
        logDataKeys.push(cell.value);
      }

      if (colNumber === 2) {
        logData[logDataKeys[rowNumber - 2]] = cell.value;
      }
    });
  });

  return logData;
};

const generateImport = async (file) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);

  const categories = getCategories(workbook);
  const entries = getEntries(workbook).map((entry) => ({
    ...entry,
    category: {
      ...entry.category,
      type: categories.find((cat) => cat.name === entry.category.name).type,
    },
  }));
  const logData = getLogData(workbook);

  return { entries, categories, logData };
};

export default generateImport;
