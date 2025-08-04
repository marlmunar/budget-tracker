import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLastAction } from "../../slices/appSlice";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const SelectCurrency = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [error, setError] = useState("");

  const currencies = ["PHP", "USD", "EUR", "JPY", "INR"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      return setError("Please enter your password");
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
          <div className="flex justify-between *:min-w-18">
            {currencies.map((item) => (
              <button
                key={item}
                type="button"
                className={`p-1 rounded bg-gray-200 ${
                  item === currency
                    ? "border-2 border-amber-400"
                    : "border-2 border-transparent"
                }`}
                onClick={() => setCurrency(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default SelectCurrency;
