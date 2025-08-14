import React from "react";

const LogExpired = ({ closeModal, resource }) => {
  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>This log has already ended on {resource.endDate}.</p>
        <p>Choose what to do with it.</p>
      </div>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {}}
        >
          Update
        </button>
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {}}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default LogExpired;
