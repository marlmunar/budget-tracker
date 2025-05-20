import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div className="my-4 md:grid grid-cols-2 gap-2">
      <UserProfile />
      <Logs />
    </div>
  );
};

export default Profile;
