import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserSettings from "../components/UserSettings";
import { useLazyGetProfileQuery } from "../slices/userApiSlice";
import { setPreferences } from "../slices/userSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { lastAction } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const [getProfile, { data }] = useLazyGetProfileQuery();

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
        <main className="flex flex-col md:max-w-[50%] mx-auto">
          <title>
            {`Budgetarians' Log - ${userInfo ? userInfo.name : "User Name"}`}
          </title>
          <UserProfile userLogs={userLogs} />
          <UserSettings userLogs={userLogs} />
        </main>
      </motion.div>
    )
  );
};

export default Profile;
