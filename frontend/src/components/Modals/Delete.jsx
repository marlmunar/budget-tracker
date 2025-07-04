import React from "react";
import { useDispatch } from "react-redux";
import { useDeleteLogMutation } from "../../slices/logsApiSlice";
import { setLastAction } from "../../slices/appSlice";

const Delete = ({ resource, closeModal }) => {
  const dispatch = useDispatch();
  const [deleteLog] = useDeleteLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">Delete {resource.name} </h3>
      <p className="modal-input-container">
        Do you want to delete this {resource.type}?
      </p>
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
