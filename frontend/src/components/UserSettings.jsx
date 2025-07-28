import { useEffect, useState } from "react";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { motion } from "framer-motion";

const UserSettings = () => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");

  const [activeSettings, setActiveSettings] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPasword("");
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
    } catch (error) {
      setError(error.message);
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
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  // const saveStats = async (e) => {
  //   e.preventDefault();
  //   if (!income && activeSettings === "income") {
  //     return setError("This field cannot be empty");
  //   }
  //   if (!goals && activeSettings === "goals") {
  //     return setError("This field cannot be empty");
  //   }
  //   let newIncome = income || (userInfo?.stats?.monthlyIncome ?? "blank");
  //   let newGoals = goals || (userInfo?.stats?.savingGoals ?? "blank");

  //   try {
  //     if (newGoals === "blank" || newIncome === "blank") {
  //       if (newIncome > 0) newGoals = Math.round(+newIncome * 0.8);
  //       else {
  //         throw new Error("Save a monthly income value first");
  //       }
  //     }
  //     if (newIncome <= 0 || newGoals <= 0) {
  //       throw new Error("Value should be greater than zero");
  //     }

  //     const res = await updateProfile({
  //       stats: { monthlyIncome: newIncome, savingGoals: newGoals },
  //     }).unwrap();
  //     dispatch(setCredentials(res));
  //     setIncome("");
  //     setGoals("");
  //     setActiveSettings("");
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //   }
  // };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <section className="rounded shadow-lg">
          <div className="flex flex-col gap-2 p-2 text-base md:text-lg">
            <div>
              <h3 className="shadow bg-slate-300 rounded font-semibold p-1 px-2">
                Profile Settings
              </h3>
              <ul className="p-2 flex flex-col gap-1 *:p-1 text-sm md:text-base">
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
                      <div className="flex flex-col justify-center md:w-[50%]">
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
                      <div className="button-row justify-self-end">
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
                        <div className="flex flex-col justify-center md:w-[50%]">
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
                        <div className="flex flex-col justify-center md:w-[50%]">
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
                      <div className="button-row justify-self-end">
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
            </div>
            <div>
              <h3 className="shadow bg-slate-300 rounded font-semibold p-1 px-2">
                Log Preferences
              </h3>
              <ul className="p-2 flex flex-col gap-1 *:p-1 text-sm md:text-base">
                <li>
                  <button type="button" onClick={() => setActiveSettings("")}>
                    Select Currency
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setActiveSettings("")}>
                    Manage Default Categories
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="shadow bg-slate-200 rounded font-semibold p-1 px-2">
                Appearance
              </h3>
              <ul className="p-2 flex flex-col gap-1 *:p-1 text-sm md:text-base">
                <li>
                  <button type="button" onClick={() => setActiveSettings("")}>
                    Dark Theme
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default UserSettings;
