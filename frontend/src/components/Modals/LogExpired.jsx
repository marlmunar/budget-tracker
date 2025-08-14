import React from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../slices/appSlice";

const LogExpired = ({ closeModal, resource }) => {
  const dispatch = useDispatch();
  const modalData = { ...resource.objData };
  console.log(modalData);

  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>This log has already ended on {resource.endDate}.</p>
        <p>Choose what to do with it:</p>
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
          onClick={() => {
            dispatch(
              setModalState({
                showModal: true,
                activeModal: "delete",
                modalData,
              })
            );
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default LogExpired;
