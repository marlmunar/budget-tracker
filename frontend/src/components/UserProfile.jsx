import { TbEdit } from "react-icons/tb";
import { useState } from "react";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../slices/appSlice";

const UserProfile = ({ userLogs }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { grade } = useSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [isRenaming, setIsRenaming] = useState(false);
  const [userName, setUserName] = useState(userInfo.name);

  return (
    <section className="mt-2 flex flex-col bg-gray-50 border-2 mx-2 dark:bg-[#2f2f2f] dark:border-[#4a4e53] border-slate-300 gap-1 items-start rounded p-4 max-h-[min-content]">
      <div className="flex w-full gap-1">
        <h2 className="text-2xl font-semibold underline">{userName}</h2>
        <button
          className="group min-h-8 min-w-8 rounded flex justify-center items-center"
          onClick={() => {
            dispatch(
              setModalState({
                showModal: true,
                activeModal: "renameUser",
                modalData: { name: userName },
              })
            );
          }}
        >
          <TbEdit className=" text-xl group-hover:text-amber-500" />
        </button>
      </div>
      <div className="grid grid-row-4 grid-cols-2 gap-x-5 gap-y-1 text-sm md:text-base">
        <span className="font-semibold">Logs:</span>
        <span> {userLogs}</span>
        <span className="font-semibold">Budgetarian Grade:</span>
        <span>{grade}</span>
      </div>
    </section>
  );
};

export default UserProfile;
