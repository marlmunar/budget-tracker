import { TbSettings, TbEdit } from "react-icons/tb";
import { useState } from "react";
import RenameModal from "./RenameModal";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";

const UserProfile = ({ userLogs }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { grade } = useSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [isRenaming, setIsRenaming] = useState(false);
  const [userName, setUserName] = useState(userInfo.name);

  const editHandler = async (tempName) => {
    let name = tempName;
    try {
      const res = await updateProfile({
        name,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col border-2 border-slate-400 gap-4 items-start shadow-lg rounded p-4 lg:max-h-[12rem]">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-semibold underline">{userName}</h2>
        <div className="flex gap-2 text-2xl items-center">
          <button className="group" onClick={() => setIsRenaming(true)}>
            <TbEdit className="transition-all duration-300 group-hover:text-amber-500" />
          </button>
          <Link to="/settings">
            <TbSettings className="transition-all duration-300 group-hover:text-amber-500" />
          </Link>
        </div>
      </div>

      {isRenaming && (
        <RenameModal
          isRenaming={isRenaming}
          setIsRenaming={setIsRenaming}
          displayName={userName}
          handleSubmit={(tempName) => {
            setIsRenaming(false);
            setUserName(tempName);
            editHandler(tempName);
          }}
          title="Edit User Name"
          description="Update your user name"
        />
      )}

      <div className="grid grid-row-4 grid-cols-2 gap-x-5 gap-y-1">
        <span className="font-semibold">Logs:</span>
        <span> {userLogs}</span>
        <span className="font-semibold">Monthly Income:</span>
        <span>
          {userInfo.stats
            ? userInfo.stats.monthlyIncome === "blank"
              ? "---"
              : userInfo.stats.monthlyIncome
            : "---"}
        </span>
        <span className="font-semibold">Saving Goals:</span>
        <span>
          {userInfo.stats
            ? userInfo.stats.savingGoals === "blank"
              ? "---"
              : userInfo.stats.savingGoals
            : "---"}
        </span>
        <span className="font-semibold">Budgetarian Grade:</span>
        <span>{grade}</span>
      </div>
    </section>
  );
};

export default UserProfile;
