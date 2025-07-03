import { useEffect, useState } from "react";
import LogCard from "../components/LogCard";
import LogTools from "../components/LogTools";
import NoRecords from "../components/NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setGrade } from "../slices/userSlice";
import { AnimatePresence, motion } from "framer-motion";

const Logs = ({}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);
  const [lastAction, setLastAction] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [getLogs, { data, isLoading }] = useLazyGetLogsQuery();
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
        const savings = entries.reduce(
          (sum, entry) =>
            entry.category.name === "Savings" ? entry.amount + sum : sum,
          0
        );

        if (userInfo.stats.savingGoals > 0) {
          const target = userInfo.stats.savingGoals;

          if (savings / target > 0.95) {
            dispatch(setGrade("Expert"));
          } else if (savings / target > 0.65) {
            dispatch(setGrade("Experienced"));
          } else {
            dispatch(setGrade("Beginner"));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lastAction]);

  return (
    <main className="px-1 md:px-6 lg:px-10 h-full lg:w-[60%] mx-auto">
      <section className="flex flex-col shadow rounded h-full relative">
        <div
          className="z-2 rounded bg-white py-2 lg:py-4 px-4
            shadow shadow-slate-300
            flex flex-col gap-2 
            min-h-[min-content]
            md:flex-row md:justify-between md:items-center"
        >
          <h2 className="pt-1 md:p-0 text-2xl font-semibold">Your Logs</h2>
          <LogTools searchState={searchState} setSearchState={setSearchState} />
        </div>

        {searchState.isSearching && (
          <div className="relative">
            <span className="min-w-[30ch] absolute z-5 left-0 px-2 p-1 top-2 bg-white rounded ml-5 text-sm flex flex-col md:flex-row md:items-center">
              Showing results for keyword:
              <span className="italic px-2 font-semibold truncate max-w-[25ch] md:max-w-[20ch] inline-block">
                {searchState.searchText}
              </span>
            </span>
          </div>
        )}
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
                      setLastAction={setLastAction}
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
      </section>
    </main>
  );
};

export default Logs;
