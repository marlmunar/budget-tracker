import ExcelJS from "exceljs";

const validateSheet = (sheet, name, headers, actualHeaders) => {
  const error = "Invalid file content";
  if (!sheet || sheet.name !== name) {
    throw new Error(error);
  }

  if (
    actualHeaders.length !== headers.length ||
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

const getSummary = (workbook) => {
  const summarySheet = workbook.worksheets[1];
  const categories = [];
  const headerRow = summarySheet.getRow(1);
  const expectedHeaders = ["Category", "Type", "Total"];
  const actualHeaders = headerRow.values.slice(1);

  validateSheet(summarySheet, "Summary", expectedHeaders, actualHeaders);

  const categoryColumn = summarySheet.getColumn(1);
  categoryColumn.eachCell((cell, cellNumber) => {
    if (cellNumber === 1) return;

    const category = {
      name: cell.value,
      color: "#" + cell.fill.fgColor.argb.slice(2),
    };
    categories.push(category);
  });

  return categories;
};

const generateImport = async (file) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);

  const entries = getEntries(workbook);
  const categories = getSummary(workbook);

  return { entries, categories };
};

export default generateImport;
