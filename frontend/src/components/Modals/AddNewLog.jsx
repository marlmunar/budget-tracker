import React, { useState } from "react";
import { TbArrowNarrowLeft, TbChevronLeft } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useCreateLogMutation } from "../../slices/logsApiSlice";

const AddNewLog = () => {
  const { defaultCategories } = useSelector((state) => state.logs);
  const [createLog] = useCreateLogMutation();
  const [logType, setLogType] = useState(null);
  const [logName, setLogName] = useState("");
  const [threshold, setTreshold] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  const logTypes = {
    1: "General Tracker",
    2: "Saving Goal",
    3: "Budget with Deadline",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logName) {
      return setError("Please provide a name");
    }
    const newLog = {
      name: logName,
      logData: {
        type: logType,
        threshold,
        startDate,
        endDate,
      },
      categories: defaultCategories,
    };
    console.log(newLog);

    try {
      const res = await createLog(newLog).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  return (
    <form className="flex flex-col gap-2 p-2 mx-auto" onSubmit={handleSubmit}>
      {!logType ? (
        <>
          <h3 className="text-xl my-2 font-semibold">Add New Log</h3>
          <p>Choose a log type</p>
          <menu className="flex flex-col md:flex-row gap-2 w-[84vw] lg:w-[55vw]">
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType(1)}
            >
              <h4>General Tracker</h4>
              <div></div>
              <span>Simple logging without goals or deadlines.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType(2)}
            >
              <h4>Saving Goal</h4>
              <div></div>
              <span>Save toward an amount by a chosen date.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType(3)}
            >
              <h4>Budget with Deadline</h4>
              <div></div>
              <span>Stay within a spending limit over time.</span>
            </button>
          </menu>
        </>
      ) : (
        <>
          <button
            className="absolute top-4 left-4 modal-button"
            onClick={() => setLogType(null)}
          >
            <TbChevronLeft />
          </button>
          <h3 className="text-lg mt-4 text-center font-semibold">
            Add New {logTypes[logType]}
          </h3>
          <div className="modal-input-container">
            <label htmlFor="logName">Log Name</label>
            <input
              id="logName"
              type="text"
              value={logName}
              onChange={(e) => setLogName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {logType === 2 && (
            <>
              <div className="modal-input-container">
                <label htmlFor="goal">Saving Goal Amount</label>
                <input id="goal" type="number" autoComplete="off" />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate1">End Date</label>
                <input id="endDate1" type="date" autoComplete="off" />
              </div>
            </>
          )}

          {logType === 3 && (
            <>
              <div className="modal-input-container">
                <label htmlFor="spendingLimit">Spending Limit</label>
                <input id="spendingLimit" type="number" autoComplete="off" />
              </div>
              <div className="modal-input-container">
                <label htmlFor="startDate">Start Date</label>
                <input id="startDate" type="date" autoComplete="off" />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate2">End Date</label>
                <input id="endDate2" type="date" autoComplete="off" />
              </div>
            </>
          )}
          <div className=" text-left text-red-500 text-sm">{error}</div>
          <button className="modal-action-button">Save</button>
        </>
      )}
    </form>
  );
};

export default AddNewLog;
