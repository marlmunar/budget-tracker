import { useSelector } from "react-redux";
import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <main className="flex flex-col justify-between gap-10 lg:grid lg:grid-cols-[34%_64%] xl:grid-cols-[29%_69%]">
      <title>
        {`Budgetarians' Log - ${userInfo ? userInfo.name : "User Name"}`}
      </title>

      <UserProfile userInfo={userInfo ? userInfo.name : "User Name"} />
      <Logs />
    </main>
  );
};

export default Profile;
