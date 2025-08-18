import ExcelJS from "exceljs";

const generateImport = async () => {
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
};

export default generateImport;
