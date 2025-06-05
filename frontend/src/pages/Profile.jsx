import { useSelector } from "react-redux";
import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";
import { useState } from "react";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userLogs, setUserLogs] = useState("0");

  return (
    <main className="flex flex-col justify-between gap-10 lg:grid lg:grid-cols-[34%_64%] xl:grid-cols-[29%_69%]">
      <title>
        {`Budgetarians' Log - ${userInfo ? userInfo.name : "User Name"}`}
      </title>

      <UserProfile userLogs={userLogs} />
      <Logs setUserLogs={setUserLogs} />
    </main>
  );
};

export default Profile;
