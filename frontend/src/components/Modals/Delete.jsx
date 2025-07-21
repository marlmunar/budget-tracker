import React from "react";
import { useDispatch } from "react-redux";
import { useDeleteLogMutation } from "../../slices/logsApiSlice";
import { setLastAction } from "../../slices/appSlice";
import { setIsNotSaved } from "../../slices/logSlice";

const Delete = ({ resource, closeModal }) => {
  const dispatch = useDispatch();
  const [deleteLog] = useDeleteLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsNotSaved(false));
    try {
      const res = await deleteLog({
        id: resource.id,
      }).unwrap();

      closeModal();
      dispatch(setLastAction(Date.now()));
     
    } catch (error) {
      console.log(error?.data?.message || error.message);
    } 
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="modal-input-container">
        <p>Do you want to delete "{resource.name}"?</p>
      </div>
      <div className="self-end flex gap-2">
        <button type="submit" className="modal-delete-button">
          Confirm
        </button>
        <button
          type="button"
          className="modal-action-button"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Delete;
