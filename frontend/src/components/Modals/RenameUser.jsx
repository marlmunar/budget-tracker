import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLastAction } from "../../slices/appSlice";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const RenameUser = ({ name, closeModal }) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(name);
  const [updateProfile, { isLoading }] = useUpdateMutation();
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
      const res = await updateProfile({
        name: newName,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      closeModal();
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="modal-input-container">
        <label htmlFor="newName">Provide your preferred name:</label>
        <input
          value={newName}
          id="newName"
          maxLength="25"
          onChange={(e) => setNewName(e.target.value)}
          autoComplete="off"
          required
        />
        {error && (
          <div className="ml-1 text-left mt-1 text-red-500 dark:text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>

      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default RenameUser;
