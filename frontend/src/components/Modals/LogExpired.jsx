import React from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../slices/appSlice";

const LogExpired = ({ closeModal, resource }) => {
  const dispatch = useDispatch();
  const endDate = resource.logData.endDate.split("T")[0];

  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>This log has already ended on {endDate}.</p>
        <p>Choose what to do with it:</p>
      </div>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {
            dispatch(
              setModalState({
                showModal: true,
                activeModal: "updateExpiry",
                modalData: {
                  logData: resource.logData,
                  name: resource.objData.name,
                  id: resource.objData.id,
                },
              })
            );
          }}
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
                modalData: { ...resource.objData },
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
