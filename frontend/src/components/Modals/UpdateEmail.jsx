import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const UpdateEmail = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [newEmail]);

  const validateEmail = (testEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEmail) {
      return setError("Please provide an email");
    }

    if (!validateEmail(newEmail)) {
      return setError("Invalid email");
    }

    try {
      const res = await updateProfile({ email: newEmail }).unwrap();
      dispatch(setCredentials(res));
      setError("");
      closeModal();
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
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
          onChange={(e) => setNewEmail(e.target.value)}
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

export default UpdateEmail;
