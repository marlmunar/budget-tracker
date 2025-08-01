import { useEffect, useState } from "react";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { motion } from "framer-motion";
import { setModalState } from "../slices/appSlice";
import { TbCaretDownFilled } from "react-icons/tb";

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
                    onClick={() => {
                      dispatch(
                        setModalState({
                          showModal: true,
                          activeModal: "updateEmail",
                        })
                      );
                    }}
                  >
                    Update Email
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        setModalState({
                          showModal: true,
                          activeModal: "updatePassword",
                        })
                      );
                    }}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="shadow bg-slate-300 rounded font-semibold p-1 px-2">
                Log Preferences
              </h3>
              <ul className="p-2 flex flex-col gap-1 *:p-1 text-sm md:text-base">
                <li className="space-x-2">
                  <label type="button">Select Currency:</label>
                  <div className="relative w-55">
                    <TbCaretDownFilled className="absolute top-2 right-1" />
                    <select
                      name="fruits"
                      id="fruits"
                      className="bg-gray-200 p-1 rounded appearance-none border-0 w-full"
                    >
                      <option value="PHP">PHP</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>
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
