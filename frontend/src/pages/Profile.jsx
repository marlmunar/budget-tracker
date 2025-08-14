import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserSettings from "../components/UserSettings";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { startLoading, stopLoading } from "../slices/appSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [getLogs, { data }] = useLazyGetLogsQuery();
  const [logs, setLogs] = useState([]);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLogs().unwrap();
        setUserLogs(res.data.length);
        setLogs([...res.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    if (userInfo) {
      fetchData();
    }
  }, [getLogs]);

  useEffect(() => {
    const entries = logs.reduce((acc, log) => acc.concat(log.entries), []);
    getTotalData(entries);
  }, [logs]);

  const getTotalData = (entries) => {
    const spent = entries
      .filter((entry) => entry.category.type === "Expense")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const earned = entries
      .filter((entry) => entry.category.type === "Income")
      .reduce((sum, entry) => sum + entry.amount, 0);

    setTotalData({ spent, earned });
  };

  const [userLogs, setUserLogs] = useState("0");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, [userInfo]);

  return (
    isVisible && (
      <motion.div
        data-motion
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden flex-1"
      >
        <main
          className="flex flex-col mx-2 p-2 gap-2
          md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] 
          lg:*:w-full
          md:mx-auto bg-gray-100 dark:bg-[#28292a] rounded"
        >
          <title>
            {`Budgetarians' Log - ${userInfo ? userInfo.name : "User Name"}`}
          </title>
          <UserProfile userLogs={userLogs} totalData={totalData} />
          <UserSettings userLogs={userLogs} />
        </main>
      </motion.div>
    )
  );
};

export default Profile;
