import { useEffect, useState } from "react";
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
  const refEntry = entry;
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

  useEffect(() => {
    setError("");
  }, [expense, amount, selectedCategory]);

  const isValidNumber = (value) => {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      value > 0 &&
      !value.toString().includes("e")
    );
  };

  const cleanNumberInput = (value) => {
    if (!value) return value;
    if (value === "0") return "0";

    if (/^0(\.\d+)?$/.test(value)) return value;

    return value.replace(/^0+(?=\d)/, "");
  };

  const handleNewAmount = (e) => {
    const raw = e.target.value;

    const cleaned = cleanNumberInput(raw);

    const [integerPart, decimalPart = ""] = cleaned.split(".");

    if (integerPart.length > 10) return;

    const limitedDecimal = decimalPart.slice(0, 4);

    const limitedValue = decimalPart
      ? `${integerPart}.${limitedDecimal}`
      : integerPart;

    setAmount(limitedValue);
  };

  const isEqual = (a, b) => {
    if (a === b) return true;

    if (
      typeof a !== "object" ||
      a === null ||
      typeof b !== "object" ||
      b === null
    )
      return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
    }

    return true;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!amount) return setError("Please fill out the amount filled");
    if (!expense) return setError("Please fill out the name filled");
    if (!selectedCategory.name) return setError("Please select a category");
    if (!isValidNumber(+amount)) return setError("Please enter a valid amount");

    const newEntry = {
      expense,
      amount,
      category,
    };

    if (isEqual(newEntry, refEntry)) return closeUI();

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
    <div className="z-25 bg-white log-form-container w-full absolute right-0 top-0 shadow shadow-slate-400">
      <div className="log-section-header">
        <h3>Edit Entry</h3>
        <div className="flex gap-2">
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            type="submit"
            form="editForm"
            formNoValidate
            onClick={handleSave}
          >
            <TbCheck />
          </button>
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
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
            onChange={(e) => handleNewAmount(e)}
            autoComplete="off"
            placeholder="0"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
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
              className="relative custom-select focus:bg-gray-100/95 focus:shadow-lg"
              style={{ backgroundColor: selectedCategory?.color }}
              tabIndex={0}
            >
              <div
                className="py-1 flex justify-between 
                                items-center *:pointer-events-none"
                data-id="addEntry"
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
                  id="addEntry"
                >
                  <menu
                    className="absolute right-0 rounded p-1
                            bg-white shadow 
                            shadow-slate-400 w-full 
                              flex flex-col gap-1"
                  >
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
                          setCategory(cat);
                          setIsSelecting(false);
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
  );
};

export default EditEntryForm;
