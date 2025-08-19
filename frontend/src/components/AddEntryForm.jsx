import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbX,
  TbCheck,
  TbTool,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTempEntry, setIsNotSaved } from "../slices/logSlice";

const AddEntryForm = ({ closeUI, setActiveUi, props }) => {
  const { logType, logData } = props;
  const dispatch = useDispatch();

  const { tempCategories } = useSelector((state) => state.logs);
  const [isSelecting, setIsSelecting] = useState(false);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [expense, amount, selectedCategory, date]);

  const isValidNumber = (value) => {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      value > 0 &&
      !value.toString().includes("e")
    );
  };

  const getId = () => {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);

    const random = "xxxxxxxxxxxxxxxx".replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const counter = (
      "000000" + ((Math.random() * 0xffffff) | 0).toString(16)
    ).slice(-6);

    return (timestamp + random + counter).toLowerCase();
  };

  const isValidDate = (date) => {
    const start = new Date(logData.startDate);
    const end = new Date(logData.endDate);
    date.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return date >= start && date <= end;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return setError("Please fill out the amount filled");
    if (!expense) return setError("Please fill out the name filled");
    if (!selectedCategory.name) return setError("Please select a category");

    if (!isValidNumber(+amount)) return setError("Please enter a valid amount");
    if (logType === 3) {
      if (!date) return setError("Please select a date");
      if (!isValidDate(new Date(date)))
        return setError("Please select a date within the log's duration");
    }

    const newLog = {
      expense,
      amount: +amount,
      category,
      date:
        logType === 3 ? new Date(date).toISOString() : new Date().toISOString(),
      _id: getId(),
    };
    dispatch(addTempEntry(newLog));
    dispatch(setIsNotSaved(true));
    closeUI();
  };

  return (
    <div
      className="
     bg-white log-form-container 
     m-2 w-[calc(100%-1rem)]
     absolute shadow shadow-slate-400"
    >
      <div className="log-section-header">
        <h3>New Entry</h3>
        <div className="flex gap-2">
          <button
            className="ml-auto log-tool-button-2"
            type="submit"
            form="newEntryForm"
            formNoValidate
          >
            <TbCheck />
          </button>
          <button className="ml-auto log-tool-button-2" onClick={closeUI}>
            <TbX />
          </button>
        </div>
      </div>

      <form
        id="newEntryForm"
        method="POST"
        className="relative p-4 rounded"
        onSubmit={(e) => handleSubmit(e)}
      >
        <>
          <div className="log-input-column">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              className="text-4xl"
              value={amount}
              onChange={(e) => handleNewAmount(e)}
              placeholder="100"
              autoComplete="off"
              step={0.01}
              required
            />
          </div>
          {logType === 3 && (
            <div className="log-input-column">
              <label htmlFor="entryDate">Date</label>
              <input
                type="date"
                id="entryDate"
                maxLength="25"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="My Entry"
                autoComplete="off"
                required
              />
            </div>
          )}
          <div className="flex flex-col lg:flex-row lg:gap-2">
            <div className="log-input-column">
              <label htmlFor="expense">Entry Name</label>
              <input
                type="text"
                id="expense"
                maxLength="25"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                placeholder="My Entry"
                autoComplete="off"
                required
              />
            </div>
            <div className="log-input-column">
              <label htmlFor="category">Category</label>
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
                        ? "dark:text-[#565656]"
                        : "text-gray-500 dark:text-[#a4a4a4]"
                    }
                  >
                    {Object.keys(selectedCategory).length > 0
                      ? selectedCategory.name
                      : "Select a category"}
                  </span>
                  <button
                    className="flex rounded justify-between items-center dark:text-[#565656]"
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
                    <menu className="category-menu scrollbar-hide">
                      {tempCategories.map((cat, index) => (
                        <li
                          className="log-options-2"
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
                      <li
                        className="log-options-3"
                        onClick={() => {
                          setActiveUi("manageCategories");
                        }}
                      >
                        <TbTool /> Manage Categories
                      </li>
                    </menu>
                  </OutsideClick>
                )}
              </div>
            </div>
          </div>

          <button
            className="clear-button"
            type="reset"
            onClick={() => {
              setExpense("");
              setAmount("");
              setSelectedCategory({});
              setError("");
              setDate("");
            }}
          >
            Clear Values
          </button>
          {error && <div className="error-message">{error}</div>}
        </>
      </form>
    </div>
  );
};

export default AddEntryForm;
