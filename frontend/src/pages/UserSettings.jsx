import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
const UserSettings = () => {
  return (
    <main className="lg:w-[50%] mx-auto mt-2 rounded p-2 shadow-lg bg-gray-50">
      <div className="flex gap-2 text-2xl items-center p-2">
        <Link className="log-button" to="/profile">
          <TbArrowBackUp />
        </Link>

        <h2 className="text-2xl font-semibold underline">User Settings</h2>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <section>
          <h3 className="shadow bg-slate-300 rounded text-xl font-semibold p-2">
            Profile Settings
          </h3>
          <ul className="p-2  flex flex-col gap-2 *:p-1">
            <li>
              <button type="button">Update Email</button>
            </li>
            <li>
              <button type="button">Change Password</button>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="shadow bg-slate-300 rounded text-xl font-semibold p-2">
            Financial Settings
          </h3>
          <ul className="p-2  flex flex-col gap-2 *:p-1">
            <li>
              <button type="button">Update Monthly Income</button>
            </li>
            <li>
              <button type="button">Set Monthly Savings Goal</button>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="shadow bg-slate-300 rounded text-xl font-semibold p-2">
            Manage Expense Categories
          </h3>
          <ul className="p-2  flex flex-col gap-2 *:p-1">
            <li>
              <button type="button">Edit Default Categories</button>
            </li>
            <li>
              <button type="button">
                Select Categories to Track as Monthly Expenses
              </button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default UserSettings;
