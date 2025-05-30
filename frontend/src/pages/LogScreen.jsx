import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import {
  TbFileDots,
  TbDeviceSdCard,
  TbFilePencil,
  TbFileDownload,
  TbFileAnalytics,
  TbFileX,
} from "react-icons/tb";
import { useLazyGetLogQuery } from "../slices/logsApiSlice";

const LogScreen = () => {
  const [logData, setLogData] = useState({});
  const [getLog, { data, isLoading }] = useLazyGetLogQuery();
  const { logId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLog(logId).unwrap();
        setLogData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [logId, getLog]);

  const [isSelecting, setIsSelecting] = useState(false);
  return (
    <main className="mx-auto md:max-w-[90%] lg:max-w-none">
      <title>{`Budgetarians' Log - ${logId}`}</title>
      <div className="relative flex justify-between items-center">
        <h2 className="text-2xl font-semibold underline">{logData.name}</h2>
        <div className="flex gap-2 text-3xl">
          <TbDeviceSdCard className="p-1 rounded cursor-pointer w-12 h-10 hover:bg-slate-300/50 hover:shadow-md hover:border-transparent transition-all duration-300" />
          <TbFileDots
            className="p-1 rounded cursor-pointer w-12 h-10 hover:bg-slate-300/50 hover:shadow-md hover:border-transparent transition-all duration-300"
            onClick={() => setIsSelecting((i) => !i)}
          />
          {isSelecting && (
            <div className="text-base mt-14 p-2 absolute shadow border-2 flex flex-col items-center gap-2 w-32 bg-white rounded right-0 topx-10">
              <div className="log-options">
                <TbFilePencil />
                <span>Rename</span>
              </div>
              <div className="log-options">
                <TbFileDownload />
                <span>Download</span>
              </div>
              <div className="log-options">
                <TbFileAnalytics />
                <span>Visualize</span>
              </div>
              <div className="log-options text-red-500">
                <TbFileX />
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="py-4 grid grid-cols-1 justify-between lg:grid-cols-[39%_59%] grid-rows-[min-content_min-content] my-2 gap-4">
        <AddEntryForm />
        <ExpenseList />
        <ExpenseSummary />
      </div>
    </main>
  );
};

export default LogScreen;
