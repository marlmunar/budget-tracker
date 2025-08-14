import { TbEdit } from "react-icons/tb";
import { useState } from "react";
import { useUpdateMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../slices/appSlice";

const grades = [
  { min: 90, max: 100, label: "Exceptional" },
  { min: 80, max: 89, label: "Outstanding" },
  { min: 70, max: 79, label: "Excellent" },
  { min: 60, max: 69, label: "Very Good" },
  { min: 50, max: 59, label: "Good" },
  { min: 15, max: 49, label: "Decent" },
  { min: 0, max: 14, label: "Poor" },
];

const UserProfile = ({ userLogs, totalData }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const getGrade = (percentage) => {
    if (!percentage) return "No Data";
    const grade = grades.find(
      (g) => percentage >= g.min && percentage <= g.max
    );

    return grade.label;
  };

  return (
    <section
      className="flex flex-col bg-gray-50 border-2
    dark:bg-[#2f2f2f] dark:border-[#4a4e53] border-slate-300 
    gap-1 items-start rounded p-2 px-4 lg:p-4 max-h-[min-content] min-w-[18rem]"
    >
      <div className="flex w-full gap-1">
        <h2 className="text-2xl font-semibold underline">{userInfo.name}</h2>
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
      <div className="flex flex-col w-full *:w-full gap-x-5 gap-y-1 text-sm lg:text-base">
        <div className="flex">
          <span className="w-full font-semibold">Logs:</span>
          <span> {userLogs}</span>
        </div>
        <div className="flex">
          <span className="w-full font-semibold">Budgetarian Grade:</span>
          <span>
            {getGrade(
              (totalData?.spent / (totalData?.spent + totalData?.earned)) * 100
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
