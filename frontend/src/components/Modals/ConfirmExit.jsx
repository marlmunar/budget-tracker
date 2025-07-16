import React, { useEffect } from "react";
import useNavigationBlocker from "../../hooks/useNavigationBlocker";

const ConfirmExit = ({ closeModal, confirmNavigation }) => {
  return (
    <form className="flex flex-col gap-2 p-2 md:p-0 min-w-72">
      <h3 className="text-base md:text-xl font-semibold flex items-center gap-1">
        Confirm Exit
      </h3>
      <p className="text-sm md:text-base max-w-[20ch] modal-input-container">
        You are trying to leave a log with unsaved changes.
      </p>
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
