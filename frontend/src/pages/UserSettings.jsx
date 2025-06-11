import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
const UserSettings = () => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [income, setIncome] = useState("");
  const [goals, setGoals] = useState("");
  const [activeSettings, setActiveSettings] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [activeSettings]);

  const savePassword = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await updateProfile({ password }).unwrap();
      setPassword("");
      setConfirmPasword("");
      setActiveSettings("");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const saveEmail = async (e) => {
    e.preventDefault();

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email");
      }

      const res = await updateProfile({ email }).unwrap();
      dispatch(setCredentials(res));
      setEmail("");
      setActiveSettings("");
      console.log(res);
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  const saveStats = async (e) => {
    e.preventDefault();
    let newIncome = income || (userInfo?.stats?.monthlyIncome ?? "blank");
    let newGoals = goals || (userInfo?.stats?.savingGoals ?? "blank");

    try {
      console.log(newIncome);
      if (newGoals === "blank" || newIncome === "blank") {
        if (newIncome > 0) newGoals = +newIncome * 0.8;
        else {
          throw new Error("Save a monthly income value first");
        }
      }
      if (newIncome <= 0 || newGoals <= 0) {
        throw new Error(
          "Monhtly income and saving goals should be greater than zero"
        );
      }

      const res = await updateProfile({
        stats: { monthlyIncome: newIncome, savingGoals: newGoals },
      }).unwrap();
      dispatch(setCredentials(res));
      setIncome("");
      setGoals("");
      setActiveSettings("");
      console.log(res);
    } catch (error) {
      console.log(newIncome);
      console.log(newGoals);
      console.error(error);
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
                <form method="POST">
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
                    <div className="pl-1 text-red-500 text-sm">{error}</div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button formNoValidate onClick={(e) => saveEmail(e)}>
                        Update
                      </button>
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
                <form method="POST">
                  <div className="flex p-4 flex-col gap-2 justify-center shadow rounded">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col justify-center w-[50%]">
                        <label htmlFor="password">Enter new password:</label>
                        <input
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                    <div className="pl-1 text-red-500 text-sm">{error}</div>
                    <div className="justify-self-end grow flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button formNoValidate onClick={(e) => savePassword(e)}>
                        Update
                      </button>
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
                <form method="POST">
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
                    <div className="pl-1 text-red-500 text-sm">{error}</div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={(e) => saveStats(e)}>Update</button>
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
                <form method="POST">
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
                    <div className="pl-1 text-red-500 text-sm">{error}</div>
                    <div className="justify-self-end flex justify-end gap-2 *:border-2 *:h-9 *:w-18 *:rounded">
                      <button onClick={(e) => saveStats(e)}>Update</button>
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
