import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCirclePlus,
  TbArrowLeft,
  TbFileImport,
  TbX,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTempEntry, setIsNotSaved } from "../slices/logSlice";

const AddEntryForm = ({
  categories,
  setIsAddingEntry,
  setIsAddingCategory,
}) => {
  const dispatch = useDispatch();
  const [isSelecting, setIsSelecting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense || !amount || !selectedCategory) {
      setError("Please fill out all fields");
      return;
    }
    if (amount <= 0) {
      setError("Value for amount should be greater than zero");
      return;
    }
    const newLog = {
      expense,
      amount,
      category,
      date: new Date().toISOString(),
    };
    dispatch(addTempEntry(newLog));
    setIsAddingEntry(false);
    dispatch(setIsNotSaved(true));
  };

  return (
    <section className="log-form-container min-w-[min-content]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setIsAddingEntry(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Log an Entry</h3>

        <button
          className="ml-auto log-tool-button my-1 "
          title="Import"
          onClick={() => setIsImporting((prev) => !prev)}
        >
          {isImporting ? <TbX /> : <TbFileImport />}
        </button>
      </div>

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded mt-2 p-2 border lg:min-w-[22rem]"
      >
        {isImporting ? (
          <>
            <div className="relative  border-slate-400 border-2 h-40 flex flex-col items-center justify-center p-2 bg-white m-4 rounded">
              <label
                for="file-upload"
                className="cursor-pointer text-xl z-50 flex justify-center items-center"
              >
                Upload File
              </label>
              <input
                type="file"
                className="absolute hidden"
                id="file-upload"
                accept=".xlsx"
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-row">
              <div className="input-column">
                <label htmlFor="expense">Expense</label>
                <input
                  type="text"
                  name="expense"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                  placeholder="Lunch"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-column">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  autoComplete="off"
                  step={0.01}
                  required
                />
              </div>
              <div className="input-column">
                <label htmlFor="category">Category</label>
                <div className="relative custom-select">
                  <div
                    className="py-1 flex justify-between items-center *:pointer-events-none"
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
                      {isSelecting ? (
                        <TbCaretUpFilled />
                      ) : (
                        <TbCaretDownFilled />
                      )}
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
                              setCategory(cat);
                              setIsSelecting(false);
                            }}
                          >
                            {cat.name}
                          </li>
                        ))}
                        <li
                          className="log-options"
                          onClick={() => {
                            setIsAddingEntry(false);
                            setIsAddingCategory(true);
                          }}
                        >
                          <TbCirclePlus /> Add New
                        </li>
                      </menu>
                    </OutsideClick>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right my-2 mr-5 text-red-500 text-sm">
              {error}
            </div>
            <div className="button-row">
              <button formNoValidate type="submit">
                Save Entry
              </button>
              <button
                type="reset"
                onClick={() => {
                  setExpense("");
                  setAmount("");
                  setSelectedCategory("");
                }}
              >
                Clear Values
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default AddEntryForm;
