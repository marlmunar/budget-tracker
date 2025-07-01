import { useSelector } from "react-redux";
// import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <main className="my-5 flex flex-col justify-between gap-10 lg:grid lg:grid-cols-[34%_64%] xl:grid-cols-[29%_69%]">
          <title>
            {`Budgetarians' Log - ${userInfo ? userInfo.name : "User Name"}`}
          </title>
          <UserProfile userLogs={userLogs} />
          {/* <Logs setUserLogs={setUserLogs} /> */}
        </main>
      </motion.div>
    )
  );
};

export default Profile;
