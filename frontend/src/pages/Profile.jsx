import Logs from "../components/Logs";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div className="my-4">
      <UserProfile />
      <Logs />
    </div>
  );
};

export default Profile;
