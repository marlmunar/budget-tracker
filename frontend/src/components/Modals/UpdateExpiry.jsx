import React, { useState } from "react";

const UpdateExpiry = ({ closeModal, name, id }) => {
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const isValidDate = (value) => {
    const today = new Date();
    return value > today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!endDate) return setError("Please select a date");
    if (!isValidDate(new Date(endDate)))
      return setError("Please use an upcoming date");
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="modal-input-container">
        <label htmlFor="endDate">
          Update end date of "<span className="font-semibold">{name}</span>"
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onClick={() => setError("")}
          onChange={(e) => setEndDate(e.target.value)}
          autoComplete="off"
        />
        {error && (
          <div className="ml-1 text-left mt-1 text-red-500 dark:text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>

      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default UpdateExpiry;
