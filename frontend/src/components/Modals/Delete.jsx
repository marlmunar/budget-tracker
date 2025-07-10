import React from "react";
import { useDispatch } from "react-redux";
import { useDeleteLogMutation } from "../../slices/logsApiSlice";
import { setLastAction } from "../../slices/appSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Delete = ({ resource, closeModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteLog] = useDeleteLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (location.pathname !== "/logs") {
        navigate("/logs");
      }

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
    <form className="flex flex-col gap-2 p-2 min-w-72" onSubmit={handleSubmit}>
      <h3 className="text-base md:text-xl font-semibold flex items-center gap-1">
        Delete
        <span className="inline-block truncate max-w-[14ch]">
          {resource.name}
        </span>
      </h3>
      <p className="text-sm md:text-base modal-input-container">
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
