import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <main className="md:grid grid-cols-2 gap-2">
      <UserProfile />
      <Logs />
    </main>
  );
};

export default Profile;
