import React, { useState } from "react";
import { TbArrowNarrowLeft, TbChevronLeft } from "react-icons/tb";

const AddNewLog = () => {
  const [logType, setLogType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
              onClick={() => setLogType("General Tracker")}
            >
              <h4>General Tracker</h4>
              <div></div>
              <span>Simple logging without goals or deadlines.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType("Saving Goal")}
            >
              <h4>Saving Goal</h4>
              <div></div>
              <span>Save toward an amount by a chosen date.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType("Budget with Deadline")}
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
            onClick={() => setLogType("")}
          >
            <TbChevronLeft />
          </button>
          <h3 className="text-lg mt-10 text-center font-semibold">
            Add New {logType}
          </h3>
          <div className="modal-input-container">
            <label htmlFor="logName">Log Name</label>
            <input
              id="logName"
              type="text"
              autoComplete="off"
              className="border-2 border-gray-800 px-2 p-1"
            />
          </div>

          {logType === "Saving Goal" && (
            <>
              <div className="modal-input-container">
                <label htmlFor="goal">Saving Goal Amount</label>
                <input
                  id="goal"
                  type="number"
                  autoComplete="off"
                  className="border-2 border-gray-800 px-2 p-1"
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate1">End Date</label>
                <input
                  id="endDate1"
                  type="date"
                  autoComplete="off"
                  className="border-2 border-gray-800 px-2 p-1"
                />
              </div>
            </>
          )}

          {logType === "Budget with Deadline" && (
            <>
              <div className="modal-input-container">
                <label htmlFor="spendingLimit">Spending Limit</label>
                <input
                  id="spendingLimit"
                  type="number"
                  autoComplete="off"
                  className="border-2 border-gray-800 px-2 p-1"
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  autoComplete="off"
                  className="border-2 border-gray-800 px-2 p-1"
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate2">End Date</label>
                <input
                  id="endDate2"
                  type="date"
                  autoComplete="off"
                  className="border-2 border-gray-800 px-2 p-1"
                />
              </div>
            </>
          )}

          <button className="modal-action-button">Save</button>
        </>
      )}
    </form>
  );
};

export default AddNewLog;
