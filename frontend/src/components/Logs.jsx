import { useEffect, useState } from "react";
import LogCard from "./LogCard";
import LogTools from "./LogTools";
import NoRecords from "./NoRecords";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setGrade } from "../slices/userSlice";
import { AnimatePresence, motion } from "framer-motion";

const Logs = ({ setUserLogs, setLastUpdate }) => {
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
        setUserLogs(sorted.length);

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
    <div className="overflow-hidden">
      <section className="flex flex-col gap-4 p-4 shadow rounded">
        <h2 className="text-2xl font-semibold">Your Logs</h2>
        <LogTools searchState={searchState} setSearchState={setSearchState} />
        {searchState.isSearching && (
          <span className="ml-5 text-sm">
            Showing results for keyword: "
            <span className="italic">{searchState.searchText}</span>"
          </span>
        )}
        {results.length > 0 ? (
          <>
            {isVisible &&
              results.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
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
      </section>
    </div>
  );
};

export default Logs;
