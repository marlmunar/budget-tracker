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

const EditEntryForm = ({ categories, setIsEditing, entry }) => {
  const dispatch = useDispatch();
  const { tempEntries } = useSelector((state) => state.logs);
  const [isSelecting, setIsSelecting] = useState(false);
  const [expense, setExpense] = useState(entry.expense);
  const [amount, setAmount] = useState(entry.amount);
  const [category, setCategory] = useState(entry.category);
  const [selectedCategory, setSelectedCategory] = useState(entry.category.name);
  const [color, setColor] = useState("");

  const handleSave = () => {
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
    setIsEditing(false);
  };

  return (
    <div className="sticky top-5">
      <div className="absolute bg-white p-2 shadow-xl rounded flex flex-col gap-2 right-0 top-0">
        <div className="lg:w-[min-content] bg-slate-500 p-4 rounded">
          <div className="font-semibold text-xl bg-slate-400 p-2 rounded flex justify-between items-center">
            <h3>Edit Entry</h3>
            <div className="py-2 flex gap-2 ">
              <button
                className="log-tool-button"
                type="submit"
                form="editForm"
                onClick={handleSave}
              >
                <TbCheck />
              </button>
              <button
                className="log-tool-button"
                onClick={() => setIsEditing(false)}
              >
                <TbX />
              </button>
            </div>
          </div>
          <form method="POST" id="editForm" className="edit-entry-form">
            <div className="input-row">
              <label htmlFor="expense">Expense</label>
              <input
                type="text"
                name="expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-row">
              <label htmlFor="expense">Amount</label>
              <input
                type="number"
                name="expense"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-row">
              <label htmlFor="category">Category</label>
              <div className="relative custom-select">
                <div
                  className="flex justify-between items-center *:pointer-events-none"
                  data-info="exempted"
                  onClick={() => setIsSelecting((prev) => !prev)}
                >
                  <span className={!!selectedCategory ? "" : "text-gray-500"}>
                    {!!selectedCategory
                      ? selectedCategory
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
                  <OutsideClick onOutsideClick={() => setIsSelecting(false)}>
                    <menu className="absolute right-0 rounded mt-2 p-2 bg-white border-2 w-full flex flex-col gap-1">
                      {categories.map((cat, index) => (
                        <li
                          className="log-options"
                          style={{ backgroundColor: cat.color }}
                          key={index}
                          onClick={() => {
                            setSelectedCategory(cat.name);
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEntryForm;
