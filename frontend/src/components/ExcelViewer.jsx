import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDownloadLogMutation } from "../slices/logsApiSlice";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../slices/appSlice";

const ExcelViewer = ({ logId, fileName }) => {
  const dispatch = useDispatch();
  const [downloadLog] = useDownloadLogMutation();
  const [blob, setBlob] = useState(null);

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64.split(",")[1]);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await downloadLog({
          logId,
          fileName,
          renderOnly: true,
        }).unwrap();
        setBlob(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, [logId, downloadLog, fileName, dispatch]);

  const [sheets, setSheets] = useState({});
  const [selectedSheet, setSelectedSheet] = useState("");

  useEffect(() => {
    if (!blob) return;
    (async () => {
      const arrayBuffer = base64ToArrayBuffer(blob);
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const allSheetsData = {};

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        allSheetsData[sheetName] = data;
      });

      setSheets(allSheetsData);

      // Set the first sheet as selected once sheets are loaded
      if (workbook.SheetNames.length > 0) {
        setSelectedSheet(workbook.SheetNames[0]);
      }
    })();
  }, [blob]);

  const sheetNames = Object.keys(sheets);
  const tableData = sheets[selectedSheet];

  return (
    <div className="p-4">
      <div className="bg-gray-50 space-y-4 p-2 rounded">
        <div className="flex space-x-2">
          {sheetNames.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedSheet(name)}
              className={`px-3 py-1 rounded ${
                selectedSheet === name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded border">
          <table className="border-collapse border w-full">
            <tbody>
              {tableData?.map((row, i) => (
                <tr key={i} className="border">
                  {row.map((cell, j) => (
                    <td key={j} className="border p-2">
                      {cell ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExcelViewer;
