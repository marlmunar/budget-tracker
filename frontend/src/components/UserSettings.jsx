import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setDarkMode, setModalState } from "../slices/appSlice";

const UserSettings = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.app);

  const [activeSettings, setActiveSettings] = useState("");
  const [error, setError] = useState("");

  const [isOn, setIsOn] = useState(darkMode);

  return (
    <>
      <motion.div
        data-motion
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden w-full"
      >
        <section className="rounded bg-gray-50 md:p-2 dark:bg-[#2f2f2f]">
          <div className="flex flex-col gap-2 p-1 text-base lg:text-lg">
            <div>
              <h3 className="shadow bg-slate-300 dark:bg-[#4a4e53] rounded font-semibold p-1 px-2">
                Profile Settings
              </h3>
              <ul className="p-1 flex flex-col gap-1 *:p-1 text-sm lg:text-base">
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
              <h3 className="shadow bg-slate-300 dark:bg-[#4a4e53] rounded font-semibold p-1 px-2">
                Log Preferences
              </h3>
              <ul className="p-1 flex flex-col gap-1 *:p-1 text-sm lg:text-base">
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
              <h3 className="shadow bg-slate-300  dark:bg-[#4a4e53] rounded font-semibold p-1 px-2">
                Appearance
              </h3>
              <ul className="p-1 flex flex-col gap-1 *:p-1 text-sm lg:text-base">
                <li className="flex justify-between">
                  <p>Dark Theme</p>
                  <div
                    className={`flex h-4 w-[1.75rem] bg-gray-300 dark:bg-[#4a4e53] rounded-full ${
                      isOn ? "justify-end" : "justify-start"
                    }`}
                    onClick={() => {
                      setIsOn((prev) => !prev);
                      dispatch(setDarkMode(!darkMode));
                    }}
                  >
                    <div className="h-4 w-4 rounded-full bg-gray-400 dark:bg-gray-200"></div>
                  </div>
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
