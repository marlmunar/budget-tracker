import { useState } from "react";
import {
  TbCheck,
  TbX,
  TbCaretUpFilled,
  TbCaretDownFilled,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";

const EditEntryForm = ({ closeUI, props }) => {
  const { categories, entry } = props;
  const dispatch = useDispatch();
  const { tempEntries } = useSelector((state) => state.logs);
  const [isSelecting, setIsSelecting] = useState(false);
  const [expense, setExpense] = useState(entry.expense);
  const [amount, setAmount] = useState(entry.amount);
  const [category, setCategory] = useState(entry.category);
  const [selectedCategory, setSelectedCategory] = useState({
    ...entry.category,
  });
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!expense || !amount || !selectedCategory) {
      setError("Please fill out all fields");
      return;
    }
    if (amount <= 0) {
      setError("Value for amount should be greater than zero");
      return;
    }
    const newEntry = {
      expense,
      amount,
      category,
    };
    const newTempEntries = tempEntries.map((tempEntry) =>
      tempEntry.expense === entry.expense
        ? {
            ...tempEntry,
            expense: newEntry.expense,
            amount: newEntry.amount,
            category: newEntry.category,
          }
        : tempEntry
    );
    dispatch(setTempEntries(newTempEntries));
    dispatch(setIsNotSaved(true));
    closeUI();
  };

  return (
    <div className="sticky top-5 z-10">
      <div className="z-25 bg-white log-form-container w-full absolute right-0 top-0 shadow shadow-slate-400">
        <div className="log-section-header">
          <h3>Edit Entry</h3>
          <div className="flex gap-2">
            <button
              className="log-tool-button  h-10 w-10 bg-slate-200"
              type="submit"
              form="editForm"
              formNoValidate
              onClick={handleSave}
            >
              <TbCheck />
            </button>
            <button
              className="log-tool-button  h-10 w-10 bg-slate-200"
              onClick={closeUI}
            >
              <TbX />
            </button>
          </div>
        </div>
        <form method="POST" id="editForm" className="relative p-4 rounded">
          <div className="log-input-column">
            <label htmlFor="newAmount">Amount</label>
            <input
              type="number"
              name="newAmount"
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              className="text-4xl"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              placeholder="0"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="log-input-column">
              <label htmlFor="newExpense">Expense Name</label>
              <input
                type="text"
                id="newExpense"
                maxLength="25"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                placeholder="New Expense Name"
                autoComplete="off"
                required
              />
            </div>
            <div className="log-input-column">
              <label htmlFor="newCategory">Category</label>
              <div
                className="relative custom-select"
                style={{ backgroundColor: selectedCategory?.color }}
                tabIndex={0}
              >
                <div
                  className="flex justify-between items-center *:pointer-events-none"
                  data-id="editEntry"
                  onClick={() => setIsSelecting((prev) => !prev)}
                  onFocus={() => setIsSelecting(true)}
                >
                  <span
                    className={
                      Object.keys(selectedCategory).length > 0
                        ? ""
                        : "text-gray-500"
                    }
                  >
                    {Object.keys(selectedCategory).length > 0
                      ? selectedCategory.name
                      : "Select a category"}
                  </span>
                  <button
                    className="flex rounded justify-between items-center"
                    type="button"
                  >
                    {isSelecting ? <TbCaretUpFilled /> : <TbCaretDownFilled />}
                  </button>
                </div>
                {isSelecting && (
                  <OutsideClick
                    onOutsideClick={() => setIsSelecting(false)}
                    id="editCat"
                  >
                    <menu className="absolute right-0 rounded mt-2 p-2 bg-white border-2 w-full flex flex-col gap-1">
                      {categories.map((cat, index) => (
                        <li
                          className="log-options"
                          style={{ backgroundColor: cat.color }}
                          key={index}
                          onClick={() => {
                            setSelectedCategory({
                              name: cat.name,
                              color: cat.color,
                            });
                            setIsSelecting(false);
                            setCategory({ name: cat.name, color: cat.color });
                          }}
                        >
                          {cat.name}
                        </li>
                      ))}
                    </menu>
                  </OutsideClick>
                )}
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-blue-400 text-sm"
            type="reset"
            onClick={() => {
              setExpense("");
              setAmount("");
              setSelectedCategory({});
              setError("");
            }}
          >
            Clear Values
          </button>
          {error && (
            <div className="text-left my-2 mr-5 text-red-500 text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditEntryForm;
