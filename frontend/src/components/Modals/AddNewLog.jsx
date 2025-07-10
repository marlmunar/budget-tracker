import React, { useEffect, useState } from "react";
import { TbArrowNarrowLeft, TbChevronLeft } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useCreateLogMutation } from "../../slices/logsApiSlice";
import { setLastAction } from "../../slices/appSlice";

const AddNewLog = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { defaultCategories } = useSelector((state) => state.logs);
  const [createLog] = useCreateLogMutation();
  const [logType, setLogType] = useState("");
  const [logName, setLogName] = useState("");
  const [threshold, setTreshold] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const logTypes = {
    1: "General Tracker",
    2: "Saving Goal",
    3: "Budget with Deadline",
  };

  useEffect(() => {
    setError("");
  }, [logType, logName, threshold, startDate, endDate]);

  const isValidNumber = (value) => {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      value > 0 &&
      !value.toString().includes("e")
    );
  };

  const isValidDate = (value) => {
    const today = new Date();
    return value > today;
  };

  const isValidRange = (d1, d2) => {
    return d2 > d1;
  };

  const removeLeadingZeros = (value) => {
    if (!value) return value;
    if (value === "0") return "0";
    if (/^0+\./.test(value)) return value.replace(/^0+/, "");
    return value.replace(/^0+(?=\d)/, "");
  };

  const handleNewThreshold = (e) => {
    const raw = e.target.value;
    const cleaned = removeLeadingZeros(raw);

    const [integerPart, decimalPart = ""] = cleaned.split(".");

    if (integerPart.length > 10) return;

    const limitedDecimal = decimalPart.slice(0, 4);

    const limitedValue = decimalPart
      ? `${integerPart}.${limitedDecimal}`
      : integerPart;

    setTreshold(limitedValue);
  };

  const resetForm = () => {
    setError("");
    setLogType("");
    setLogName("");
    setTreshold("");
    setStartDate("");
    setEndDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logName) {
      return setError("Please provide a name");
    }

    if (logType > 1) {
      if (!threshold) {
        if (logType === 2) return setError("Please provide a saving goal");
        if (logType === 3) return setError("Please provide a budget");
      }
      if (logType === 3 && !startDate)
        return setError("Please select a starting date");
      if (!endDate) return setError("Please select an end date");
      if (!isValidNumber(parseFloat(threshold)))
        return setError("Invalid number format");
      if (!isValidDate(new Date(endDate)))
        return setError("Please use an upcoming date");
      if (logType === 3 && !isValidDate(new Date(startDate)))
        return setError("Please use an upcoming date");
      if (
        logType === 3 &&
        !isValidRange(new Date(startDate), new Date(endDate))
      )
        return setError("Invalid date range");
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

    try {
      const res = await createLog(newLog).unwrap();
      closeModal();
      dispatch(setLastAction(Date.now()));
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 p-2 mx-auto min-w-72"
      onSubmit={handleSubmit}
    >
      {!logType ? (
        <>
          <h3 className="text-base md:text-xl my-2 font-semibold">
            Add New Log
          </h3>
          <p className="text-sm md:text-base">Choose a log type</p>
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
            onClick={resetForm}
          >
            <TbChevronLeft />
          </button>
          <h3 className="text-base md:text-xl mt-10 md:mt-6 text-center font-semibold">
            Add New {logTypes[logType]}
          </h3>
          <div className="modal-input-container">
            <label htmlFor="logName">Log Name</label>
            <input
              id="logName"
              type="text"
              maxLength="25"
              value={logName}
              onChange={(e) => setLogName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {logType === 2 && (
            <>
              <div className="modal-input-container">
                <label htmlFor="goal">Saving Goal Amount</label>
                <input
                  id="goal"
                  type="number"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  value={threshold}
                  onChange={(e) => handleNewThreshold(e)}
                  autoComplete="off"
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate1">End Date</label>
                <input
                  id="endDate1"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </>
          )}

          {logType === 3 && (
            <>
              <div className="modal-input-container">
                <label htmlFor="spendingLimit">Spending Limit</label>
                <input
                  id="spendingLimit"
                  type="number"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  autoComplete="off"
                  value={threshold}
                  onChange={(e) => handleNewThreshold(e)}
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="modal-input-container">
                <label htmlFor="endDate2">End Date</label>
                <input
                  id="endDate2"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </>
          )}
          <div className=" text-left text-red-500 text-sm">{error}</div>
          <button className="modal-action-button" formNoValidate>
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default AddNewLog;
