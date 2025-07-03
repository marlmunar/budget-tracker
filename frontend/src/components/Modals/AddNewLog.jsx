import React, { useState } from "react";

const AddNewLog = () => {
  const [logType, setLogType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">
        Add New {!logType ? "Log" : logType}
      </h3>
      {!logType ? (
        <>
          <p>Choose a log type</p>
          <menu className="flex gap-2">
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType("General Tracker")}
            >
              <h4>General Tracker</h4>
              <span>Simple logging without goals or deadlines.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType("Saving Goal")}
            >
              <h4>Saving Goal</h4>
              <span>Save toward an amount by a chosen date.</span>
            </button>
            <button
              className="log-type-button"
              type="button"
              onClick={() => setLogType("Budget with Deadline")}
            >
              <h4>Budget with Deadline</h4>
              <span>Stay within a spending limit over time.</span>
            </button>
          </menu>
        </>
      ) : (
        <>
          <label htmlFor="logName">Log Name</label>
          <input
            id="logName"
            type="text"
            autoComplete="off"
            className="border-2 border-gray-800 px-2 p-1"
          />

          {logType === "Saving Goal" && (
            <>
              <label htmlFor="logName">Saving Goal Amount</label>
              <input
                id="logName"
                type="number"
                autoComplete="off"
                className="border-2 border-gray-800 px-2 p-1"
              />
              <label htmlFor="logName">End Date</label>
              <input
                id="logName"
                type="date"
                autoComplete="off"
                className="border-2 border-gray-800 px-2 p-1"
              />
            </>
          )}

          {logType === "Budget with Deadline" && (
            <>
              <label htmlFor="logName">Spending Limit</label>
              <input
                id="logName"
                type="number"
                autoComplete="off"
                className="border-2 border-gray-800 px-2 p-1"
              />
              <label htmlFor="logName">Start Date</label>
              <input
                id="logName"
                type="date"
                autoComplete="off"
                className="border-2 border-gray-800 px-2 p-1"
              />
              <label htmlFor="logName">End Date</label>
              <input
                id="logName"
                type="date"
                autoComplete="off"
                className="border-2 border-gray-800 px-2 p-1"
              />
            </>
          )}

          <button className="shadow rounded w-18 py-2 self-end">Save</button>
        </>
      )}
    </form>
  );
};

export default AddNewLog;
