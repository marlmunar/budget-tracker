import { TbSettings, TbEdit } from "react-icons/tb";
import { useState } from "react";
import RenameModal from "./RenameModal";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
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
          <TbEdit
            className="transition-all duration-300 hover:text-amber-500"
            onClick={() => setIsRenaming(true)}
          />
          <TbSettings className="transition-all duration-300 hover:text-amber-500" />
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
        <span> 2</span>
        <span className="font-semibold">Monthly Income:</span>
        <span> 23,000</span>
        <span className="font-semibold">Monthly Expense:</span>
        <span> 21,892</span>
        <span className="font-semibold">Budgetarian Grade:</span>
        <span> Good</span>
      </div>
    </section>
  );
};

export default UserProfile;
