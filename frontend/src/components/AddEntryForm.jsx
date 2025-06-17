import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCirclePlus,
  TbArrowLeft,
  TbFileImport,
  TbX,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTempEntry, setIsNotSaved } from "../slices/logSlice";
import {
  useImportLogMutation,
  useUpdateLogMutation,
} from "../slices/logsApiSlice";
import { useParams } from "react-router-dom";

const AddEntryForm = ({ categories, setActiveAction, setLastAction }) => {
  const dispatch = useDispatch();
  const { logId } = useParams();
  const [importLog] = useImportLogMutation();
  const [updateLog] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const referenceEntries = tempEntries.map((entry) => {
    const keys = ["expense", "amount", "category", "date"];

    return JSON.stringify(
      Object.fromEntries(keys.map((key) => [key, entry[key]]))
    );
  });

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

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    let res;
    let updatedEntries = [];

    try {
      res = await importLog(formData).unwrap();
      const newTempEntries = res.entries.filter(
        (entry) => !referenceEntries.includes(JSON.stringify(entry))
      );
      if (newTempEntries.length > 0) {
        newTempEntries.map((entry) => dispatch(addTempEntry(entry)));
      }
      updatedEntries = [...tempEntries, ...newTempEntries];
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    } finally {
      if (!res) return;
      const updatedCategories = [...res.categories];
      const newCategoryNames = res.categories.map((cat) => cat.name);
      console.log(newCategoryNames);
      categories.map(
        (cat) =>
          !newCategoryNames.includes(cat.name) && updatedCategories.push(cat)
      );
      try {
        console.log(updatedEntries);
        const result = await updateLog({
          id: logId,
          data: { categories: updatedCategories, entries: updatedEntries },
        }).unwrap();
        setLastAction(Date.now());
      } catch (error) {
        const errorMsg = error?.data?.message || error.message;
        setError(errorMsg);
      }
    }

    setError("");
    setFile(null);
    setActiveAction("");
    fileInputRef.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense || !amount || !selectedCategory) {
      setError("Please fill out fields with valid input");
      return;
    }
    if (amount <= 0) {
      setError("Value for amount should be greater than zero");
      return;
    }
    const newLog = {
      expense,
      amount: +amount,
      category,
      date: new Date().toISOString(),
    };
    dispatch(addTempEntry(newLog));
    setActiveAction("");
    dispatch(setIsNotSaved(true));
  };

  return (
    <section className="log-form-container min-w-[min-content]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setActiveAction("")}
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
        className="bg-slate-100 rounded mt-2 p-2 border lg:min-w-[22rem]"
      >
        {isImporting ? (
          <>
            <div className="relative  border-slate-400 border-2 h-40 flex flex-col items-center justify-center p-2 bg-white m-4 rounded">
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
            <div className="text-right my-2 mr-5 text-red-500 text-sm">
              {error}
            </div>
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
                            setActiveAction("Adding Category");
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
              <button
                formNoValidate
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
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
