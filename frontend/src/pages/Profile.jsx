import LogTools from "../components/LogTools";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div>
      <UserProfile />
      <LogTools />
      <section id="logs">
        <h2>Your Logs</h2>

        <div class="log-container">
          <h3>Log Name 1</h3>
          <div class="log-stats">
            <p>21 Categories</p>
            <p>Last edited: 2 days ago</p>
          </div>
          <div class="log-actions">
            <p>Log Options:</p>
            <button>Rename</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>

        <div class="log-container">
          <h3>Log Name 2</h3>
          <div class="log-stats">
            <p>5 Categories</p>
            <p>Last edited: a month ago</p>
          </div>
          <div class="log-actions">
            <p>Log Options:</p>
            <button>Rename</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
