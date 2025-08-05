import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLastAction } from "../../slices/appSlice";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const UpdatePassword = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfrimNewPassword] = useState("");
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      return setError("Please enter your password");
    }

    if (!newPassword) {
      return setError("Please enter your new password");
    }

    if (!confirmNewPassword) {
      return setError("Please confirm your new password");
    }

    // try {
    //   const res = await updateProfile({
    //     name: newName,
    //   }).unwrap();

    //   dispatch(setCredentials({ ...res }));
    //   closeModal();
    // } catch (error) {
    //   const errorMsg = error?.data?.message || error.message;
    //   setError(errorMsg);
    // }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="modal-input-container">
          <label htmlFor="password">Enter your password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded px-2 p-1 border-2"
            autoComplete="off"
            required
          />
        </div>
        <div className="modal-input-container">
          <label htmlFor="newPassword">Enter new password:</label>
          <input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className=" rounded px-2 p-1 border-2"
            autoComplete="off"
            required
          />
        </div>
        <div className="modal-input-container">
          <label htmlFor="confirmNewPassword">Confirm new password:</label>
          <input
            name="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfrimNewPassword(e.target.value)}
            className=" rounded px-2 p-1 border-2"
            autoComplete="off"
            required
          />
        </div>
      </div>

      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default UpdatePassword;
