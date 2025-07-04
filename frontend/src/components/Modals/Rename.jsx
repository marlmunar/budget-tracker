import React, { useState } from "react";
import { useUpdateLogMutation } from "../../slices/logsApiSlice";
import { useDispatch } from "react-redux";
import { setLastAction } from "../../slices/appSlice";

const Rename = ({ name, id, closeModal }) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(name);
  const [updateLog] = useUpdateLogMutation();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newName) {
      return setError("Please provide a name");
    }

    if (name === newName) {
      return closeModal();
    }

    try {
      const res = await updateLog({
        id,
        data: { name: newName },
      }).unwrap();
      closeModal();
      dispatch(setLastAction(Date.now()));
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  return (
    <form className="flex flex-col gap-2 p-2 md:p-0" onSubmit={handleSubmit}>
      <h3 className="text-xl mt-2 font-semibold ml-2">Rename Log</h3>
      <div className="modal-input-container px-2">
        <label className="flex items-center gap-1" htmlFor="newName">
          Edit name of
          <span className="font-semibold max-w-[15ch] inline-block truncate">
            "{name}"
          </span>
        </label>
        <input
          value={newName}
          id="newName"
          onChange={(e) => setNewName(e.target.value)}
          autoComplete="off"
          required
        />
        <div className="ml-1 text-left mt-1 text-red-500 text-sm">{error}</div>
      </div>

      <button className="modal-action-button mr-2" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default Rename;
