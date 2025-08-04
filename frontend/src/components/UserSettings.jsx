import { useEffect, useRef, useState } from "react";
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

  const selectRef = useRef(null);

  const openSelect = () => {
    console.log("Should open");
    if (selectRef.current) {
      selectRef.current.focus();
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
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        setModalState({
                          showModal: true,
                          activeModal: "selectCurrency",
                        })
                      );
                    }}
                  >
                    Select Currency
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        setModalState({
                          showModal: true,
                          activeModal: "defaultCategories",
                        })
                      );
                    }}
                  >
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
