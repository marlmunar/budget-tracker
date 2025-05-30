import { useEffect, useState } from "react";
import LogCard from "./LogCard";
import LogTools from "./LogTools";
import NoRecords from "./NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [getLogs, { data, isLoading }] = useLazyGetLogsQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLogs().unwrap();
        let sorted = [...res.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setLogs(sorted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getLogs]);

  return (
    <div>
      <section className=" flex flex-col gap-4 p-4 shadow rounded">
        <h2 className="text-2xl font-semibold">Your Logs</h2>
        <LogTools />

        {logs.length > 0 ? (
          <>
            {logs.map((log, index) => (
              <LogCard
                key={index}
                logName={log.name}
                logStats={{
                  entries: log.entries.length,
                  lastEdited: log.updatedAt.split("T")[0],
                }}
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
