import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../slices/appSlice";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { clearCredentials } from "../../slices/authSlice";

const ConfirmLogout = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    console.log("here");
    try {
      dispatch(startLoading());
      console.log("started loading");
      const res = await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
      console.log("should navigate");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
      console.log("stopped loading");
      closeModal();
    }
  };

  return (
    <form className="modal-form">
      <div className="modal-input-container">
        <p>Are you sure you want to leave?</p>
      </div>
      <div className="self-end flex gap-2">
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {
            handleLogout();
          }}
        >
          Confirm
        </button>
        <button
          type="button"
          className="modal-action-button"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ConfirmLogout;
