import { useEffect, useState } from "react";
import LogCard from "./LogCard";
import LogTools from "./LogTools";
import NoRecords from "./NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../slices/appSlice";

const Logs = ({ setUserLogs }) => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [lastAction, setLastAction] = useState("");
  const [getLogs, { data, isLoading }] = useLazyGetLogsQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLogs().unwrap();
        let sorted = [...res.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setLogs(sorted);
        setUserLogs(sorted.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [lastAction]);

  return (
    <div>
      <section className=" flex flex-col gap-4 p-4 shadow rounded">
        <h2 className="text-2xl font-semibold">Your Logs</h2>
        <LogTools />

        {logs.length > 0 ? (
          <>
            {logs.map((log) => (
              <LogCard
                key={log._id}
                setLastAction={setLastAction}
                logName={log.name}
                logStats={{
                  entries: log.entries.length,
                  lastEdited: log.updatedAt.split("T")[0],
                }}
                logId={log._id}
              />
            ))}
          </>
        ) : (
          <NoRecords />
        )}
      </section>
    </div>
  );
};

export default Logs;
