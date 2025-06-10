import { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useUpdateMutation } from "../slices/userApiSlice";
const UserSettings = () => {
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [income, setIncome] = useState("");
  const [goals, setGoals] = useState("");
  const [activeSettings, setActiveSettings] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (goals < 0 || income < 0) {
        throw new Error("Numerical values should not be less than 0");
      }

      const res = await updateProfile({}).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <title>Budgetarians' Log - User Settings</title>
      <main className="lg:w-[50%] mx-auto mt-2 rounded p-2 shadow-lg">
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
                <button
                  type="button"
                  onClick={() => setActiveSettings("email")}
                >
                  Update Email
                </button>
              </li>
              {activeSettings === "email" && (
                <form>
                  <div className="flex p-4 flex-col gap-2 justify-center shadow rounded">
                    <div className="flex flex-col justify-center w-[50%]">
                      <label htmlFor="email">Enter new email:</label>
                      <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=" rounded px-2 p-1 border-2"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={handleSubmit}>Update</button>
                      <button
                        type="button"
                        onClick={() => setActiveSettings("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => setActiveSettings("password")}
                >
                  Change Password
                </button>
              </li>
              {activeSettings === "password" && (
                <form>
                  <div className="flex p-4 flex-col gap-2 justify-center shadow rounded">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col justify-center w-[50%]">
                        <label htmlFor="password">Enter new password:</label>
                        <input
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPasword(e.target.value)}
                          className="rounded px-2 p-1 border-2"
                          autoComplete="off"
                          required
                        />
                      </div>
                      <div className="flex flex-col justify-center w-[50%]">
                        <label htmlFor="newPassword">
                          Confirm new password:
                        </label>
                        <input
                          name="newPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPasword(e.target.value)}
                          className=" rounded px-2 p-1 border-2"
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>

                    <div className="justify-self-end grow flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={handleSubmit}>Update</button>
                      <button
                        type="button"
                        onClick={() => setActiveSettings("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </ul>
          </section>

          <section>
            <h3 className="shadow bg-slate-300 rounded text-xl font-semibold p-2">
              Financial Settings
            </h3>
            <ul className="p-2  flex flex-col gap-2 *:p-1">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveSettings("income")}
                >
                  Update Monthly Income
                </button>
              </li>
              {activeSettings === "income" && (
                <form>
                  <div className="flex p-4 flex-col gap-2 justify-center shadow rounded">
                    <div className="flex flex-col justify-center w-[50%]">
                      <label htmlFor="income">Enter monthly income:</label>
                      <input
                        name="income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className=" rounded px-2 p-1 border-2"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={handleSubmit}>Update</button>
                      <button
                        type="button"
                        onClick={() => setActiveSettings("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => setActiveSettings("goals")}
                >
                  Set Monthly Savings Goal
                </button>
              </li>
              {activeSettings === "goals" && (
                <form>
                  <div className="flex p-4 flex-col gap-2 justify-center shadow rounded">
                    <div className="flex flex-col justify-center w-[50%]">
                      <label htmlFor="savingGoals">Enter new goal:</label>
                      <input
                        name="savingGoals"
                        type="number"
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        className=" rounded px-2 p-1 border-2"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={handleSubmit}>Update</button>
                      <button
                        type="button"
                        onClick={() => setActiveSettings("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserSettings;
