import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLastAction } from "../../slices/appSlice";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const UpdateEmail = ({ name, closeModal }) => {
  const dispatch = useDispatch();
  const [newEmail, setNewEMail] = useState(name);
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [error, setError] = useState("");

  const validateEmail = (testEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEmail) {
      return setError("Please provide an email");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email");
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
      <div className="modal-input-container">
        <label htmlFor="newName">Provide your updated email</label>
        <input
          value={newEmail}
          id="newName"
          type="email"
          placeholder="New Email"
          maxLength="25"
          onChange={(e) => setNewName(e.target.value)}
          autoComplete="off"
          required
        />
        <div className="ml-1 text-left mt-1 text-red-500 text-sm">{error}</div>
      </div>

      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default UpdateEmail;
