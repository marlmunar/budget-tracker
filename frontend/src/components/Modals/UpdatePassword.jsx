import React, { useEffect, useState } from "react";
import {
  useAuthenticateMutation,
  useUpdateMutation,
} from "../../slices/userApiSlice";

const UpdatePassword = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfrimNewPassword] = useState("");
  const [updateProfile] = useUpdateMutation();
  const [authenticate] = useAuthenticateMutation();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [password, newPassword, confirmNewPassword]);

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

    if (newPassword !== confirmNewPassword) {
      return setError("Please enter matching passwords");
    }

    try {
      const res = await authenticate({
        password,
      }).unwrap();
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }

    if (password === newPassword && password === confirmNewPassword) {
      return setError("Please do not use your old password");
    }

    try {
      const res = await updateProfile({ password: newPassword }).unwrap();
      closeModal();
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
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
      {error && (
        <div className="ml-1 text-left mt-1 text-red-500 dark:text-red-300 text-sm">
          {error}
        </div>
      )}
      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default UpdatePassword;
