import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <main className="flex flex-col justify-between gap-10 lg:grid lg:grid-cols-[34%_64%] xl:grid-cols-[29%_69%]">
      <UserProfile />
      <Logs />
    </main>
  );
};

export default Profile;
