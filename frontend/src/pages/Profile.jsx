import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <main className="flex flex-col gap-10 lg:grid  lg:grid-cols-[35%_65%] xl:grid-cols-[30%_70%]">
      <UserProfile />
      <Logs />
    </main>
  );
};

export default Profile;
