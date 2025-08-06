import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setPreferences } from "../../slices/userSlice";
import { setLastAction } from "../../slices/appSlice";

const SelectCurrency = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { logPreferences } = useSelector((state) => state.user);
  const [currency, setCurrency] = useState(logPreferences.currency);
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [error, setError] = useState("");

  const currencies = ["PHP", "USD", "EUR", "JPY", "INR"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currency) return setError("Please select a currency");
    try {
      const res = await updateProfile({
        logPreferences: { currency },
      }).unwrap();
      dispatch(setPreferences(res.logPreferences));
      dispatch(setLastAction(Date.now()));
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
      {error && (
        <div className="mx-1 text-left text-red-500 md:text-sm text-xs">
          {error}
        </div>
      )}
      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default SelectCurrency;
