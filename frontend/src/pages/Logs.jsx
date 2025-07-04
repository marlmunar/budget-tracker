import { useEffect, useState } from "react";
import LogCard from "../components/LogCard";
import LogTools from "../components/LogTools";
import NoRecords from "../components/NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

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
      }
    };

    fetchData();
  }, [lastAction]);

  return (
    <main className="px-1 md:px-6 lg:px-10 h-full lg:w-[60%] mx-auto">
      <section className="shadow rounded">
        <div>
          <div
            className="z-2 rounded bg-white p-4
            shadow shadow-slate-300
            flex flex-col gap-2 
            min-h-[min-content]
            md:flex-row md:justify-between md:items-center"
          >
            <h2 className="md:p-0 text-2xl font-semibold">Your Logs</h2>
            <LogTools
              searchState={searchState}
              setSearchState={setSearchState}
            />
          </div>

          <div className="flex flex-col w-full gap-1 p-2 md:px-0 pt-3 pb-4 rounded-b h-full">
            {results.length > 0 ? (
              <>
                {isVisible &&
                  results.map((log) => (
                    <motion.div
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
                      />
                    </motion.div>
                  ))}
              </>
            ) : (
              <NoRecords />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Logs;
