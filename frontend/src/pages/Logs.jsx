import { useEffect, useState } from "react";
import LogCard from "../components/LogCard";
import LogTools from "../components/LogTools";
import NoRecords from "../components/NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { startLoading, stopLoading } from "../slices/appSlice";

const Logs = ({}) => {
  const dispatch = useDispatch();
  const { lastAction } = useSelector((state) => state.app);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [getLogs] = useLazyGetLogsQuery();
  const [searchState, setSearchState] = useState({
    isSearching: false,
    searchText: "",
  });

  useEffect(() => {
    if (!searchState.isSearching) {
      setResults(logs);
      return;
    }

    let filteredlogs = logs.filter((log) =>
      log.name.toLowerCase().includes(searchState.searchText.toLowerCase())
    );

    setResults(filteredlogs);
  }, [searchState.searchText, logs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLogs().unwrap();
        let sorted = [...res.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setLogs(sorted);

        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 50);

        const entries = sorted.flatMap((data) => data.entries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [lastAction]);

  return (
    <main className="px-1 md:px-6 lg:px-10 h-full lg:w-[95%] xl:w-[70%] mx-auto">
      <section className="flex flex-col shadow rounded h-full bg-gray-200 dark:bg-[#28292a]">
        <div className="md:relative">
          <div
            className="rounded bg-white dark:bg-[#2f2f2f] p-2 md:p-4
            shadow shadow-slate-300 dark:shadow-slate-950 dark:shadow-xs
            flex flex-col gap-1 justify-center h-full
            max-h-[min-content] min-h-10
            md:flex-row md:justify-between md:items-center"
          >
            <h2 className="px-1 md:p-0 text-lg md:text-2xl flex items-center min-h-10 font-semibold">
              Your Logs
            </h2>
          </div>
          <div>
            <LogTools
              searchState={searchState}
              setSearchState={setSearchState}
            />
          </div>
        </div>

        <div className="flex flex-col w-full rounded-b h-full pt-1">
          {results.length > 0 ? (
            <>
              {isVisible &&
                results.map((log) => (
                  <motion.div
                    data-motion
                    key={log._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <LogCard
                      logName={log.name}
                      logStats={{
                        entries: log.entries.length,
                        lastEdited: log.updatedAt.split("T")[0],
                      }}
                      logId={log._id}
                      logData={log.logData}
                    />
                  </motion.div>
                ))}
            </>
          ) : (
            <NoRecords />
          )}
        </div>
      </section>
    </main>
  );
};

export default Logs;
