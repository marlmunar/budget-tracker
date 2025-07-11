import React from "react";

const ConfirmExit = ({ closeModal, pendingTx }) => {
  return (
    <form className="flex flex-col gap-2 p-2">
      <h3 className="text-xl font-semibold">Confirm Exit</h3>
      <p className="modal-input-container">
        You are trying to leave a log with unsaved changes.
      </p>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-delete-button"
          onClick={() => {
            closeModal();
            pendingTx.retry();
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
