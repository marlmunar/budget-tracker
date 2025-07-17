import React, { useEffect } from "react";
import useNavigationBlocker from "../../hooks/useNavigationBlocker";

const ConfirmExit = ({ closeModal, confirmNavigation }) => {
  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>You are trying to leave a log with unsaved changes.</p>
      </div>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-delete-button"
          onClick={() => {
            closeModal();
            confirmNavigation();
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

export default ConfirmExit;
