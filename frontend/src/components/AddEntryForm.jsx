import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCirclePlus,
  TbArrowLeft,
  TbFileImport,
  TbX,
  TbCheck,
  TbTool,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTempEntry, setIsNotSaved } from "../slices/logSlice";
import {
  useImportLogMutation,
  useUpdateLogMutation,
} from "../slices/logsApiSlice";
import { useParams } from "react-router-dom";

const AddEntryForm = ({ closeUI, setActiveUi, props }) => {
  const { logType } = props;
  const dispatch = useDispatch();
  const { logId } = useParams();
  const [importLog] = useImportLogMutation();
  const [updateLog] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const { tempCategories } = useSelector((state) => state.logs);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const referenceEntries = tempEntries.map((entry) => {
    const keys = ["expense", "amount", "category", "date"];

    return JSON.stringify(
      Object.fromEntries(keys.map((key) => [key, entry[key]]))
    );
  });

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

  const isValidDate = (date) => {
    const today = new Date();
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return date >= today;
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

  const handleChange = (e) => {
    if (!e.target.files[0].name) return;
    if (
      e.target.files[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("Invalid file type");
      setFile(null);
      return;
    }
    setError("");
    setFile(e.target.files[0]);
  };

  // const handleImport = async (e) => {
  //   e.preventDefault();
  //   if (!file) return setError("Please select a file");

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   let res;
  //   let updatedEntries = [];

  //   try {
  //     res = await importLog(formData).unwrap();
  //     const newTempEntries = res.entries.filter(
  //       (entry) => !referenceEntries.includes(JSON.stringify(entry))
  //     );
  //     if (newTempEntries.length > 0) {
  //       newTempEntries.map((entry) => dispatch(addTempEntry(entry)));
  //     }
  //     updatedEntries = [...tempEntries, ...newTempEntries];
  //   } catch (error) {
  //     const errorMsg = error?.data?.message || error.message;
  //     setError(errorMsg);
  //   } finally {
  //     if (!res) return;
  //     const updatedCategories = [...res.categories];
  //     const newCategoryNames = res.categories.map((cat) => cat.name);
  //     console.log(newCategoryNames);
  //     categories.map(
  //       (cat) =>
  //         !newCategoryNames.includes(cat.name) && updatedCategories.push(cat)
  //     );
  //     try {
  //       console.log(updatedEntries);
  //       const result = await updateLog({
  //         id: logId,
  //         data: { categories: updatedCategories, entries: updatedEntries },
  //       }).unwrap();
  //     } catch (error) {
  //       const errorMsg = error?.data?.message || error.message;
  //       setError(errorMsg);
  //     }
  //   }

  //   setError("");
  //   setFile(null);
  //   fileInputRef.current.value = null;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return setError("Please fill out the amount filled");
    if (!expense) return setError("Please fill out the name filled");
    if (!selectedCategory.name) return setError("Please select a category");

    if (!isValidNumber(+amount)) return setError("Please enter a valid amount");
    if (logType === 3) {
      if (!date) return setError("Please select a date");
      if (!isValidDate(new Date(date)))
        return setError("Please enter a more recent date");
    }

    const newLog = {
      expense,
      amount: +amount,
      category,
      date: new Date().toISOString(),
    };
    dispatch(addTempEntry(newLog));
    dispatch(setIsNotSaved(true));
    closeUI();
  };

  return (
    <div
      className="
     bg-white log-form-container w-full 
     absolute top-0 
     shadow shadow-slate-400"
    >
      <div className="log-section-header">
        <h3>New Entry</h3>
        <div className="flex gap-2">
          <button
            className="ml-auto log-tool-button h-10 w-10 bg-slate-200"
            type="submit"
            form="newEntryForm"
            formNoValidate
          >
            <TbCheck />
          </button>
          <button
            className="ml-auto log-tool-button h-10 w-10 bg-slate-200"
            onClick={closeUI}
          >
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
        {isImporting ? (
          <>
            <div className="relative border-slate-400 border-2 h-40 flex flex-col items-center justify-center p-2 bg-white m-4 rounded">
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-xl z-50 flex justify-center items-center"
              >
                {file ? file.name : "Select a file"}
              </label>
              <input
                type="file"
                className="absolute hidden"
                id="file-upload"
                accept=".xlsx"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>
            <div className="error-message">{error}</div>
            <div className="button-row">
              <button
                formNoValidate
                type="submit"
                onClick={(e) => handleImport(e)}
              >
                Import
              </button>
            </div>
          </>
        ) : (
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
            <div className="flex flex-col md:flex-row md:gap-2">
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
                      {isSelecting ? (
                        <TbCaretUpFilled />
                      ) : (
                        <TbCaretDownFilled />
                      )}
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
                          className="log-options-2 bg-white"
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
        )}
      </form>
    </div>
  );
};

export default AddEntryForm;
