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
        setLogs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getLogs]);
  console.log(logs);

  return (
    <div>
      <section className=" flex flex-col gap-4 p-4 shadow rounded">
        <h2 className="text-2xl font-semibold">Your Logs</h2>
        <LogTools />

        {!!logs ? (
          <>
            {logs.map((log, index) => (
              <LogCard
                key={index}
                logName={log.name}
                logStats={{
                  categories: log.categories.length,
                  lastEdited: log.updatedAt.split("T")[0],
                }}
              />
            ))}
          </>
        ) : (
          <div>
            <NoRecords />
          </div>
        )}
      </section>
    </div>
  );
};

export default Logs;
