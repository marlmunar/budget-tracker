import React from "react";

const ConfirmLogout = ({ closeModal }) => {
  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>Are you sure you want to leave?</p>
      </div>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {
            closeModal();
          }}
        >
          Confirm
        </button>
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ConfirmLogout;
