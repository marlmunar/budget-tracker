import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDownloadLogMutation } from "../slices/logsApiSlice";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../slices/appSlice";

const ExcelViewer = ({ logId, fileName }) => {
  const dispatch = useDispatch();
  const [downloadLog] = useDownloadLogMutation();
  const [blob, setBlob] = useState(null);

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
  }, [logId, downloadLog]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!blob) return;
    (async () => {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      setTableData(data);
    })();
  }, [blob]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewer;
