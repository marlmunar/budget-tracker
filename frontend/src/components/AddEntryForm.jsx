import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCirclePlus,
  TbArrowLeft,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTempEntry } from "../slices/logSlice";

const AddEntryForm = ({
  categories,
  setIsAddingEntry,
  setIsAddingCategory,
}) => {
  const dispatch = useDispatch();
  const [isSelecting, setIsSelecting] = useState(false);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      console.error("Category field cannot be blank");
      return;
    }
    const newLog = {
      expense,
      amount,
      category,
      date: new Date().toISOString(),
    };
    dispatch(addTempEntry(newLog));
    console.log(newLog);
  };

  return (
    <section className="log-section-container row-span-2 max-h-[min-content] min-w-[calc(0.25*100vw)]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setIsAddingEntry(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Log an Entry</h3>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
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
                  {!!selectedCategory ? selectedCategory : "Select a category"}
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
                          setCategory(cat);
                          setIsSelecting(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                    <li className="log-options">
                      <TbCirclePlus /> Add New
                    </li>
                  </menu>
                </OutsideClick>
              )}
            </div>
          </div>
        </div>
        <div className="button-row">
          <button type="submit">Save Entry</button>
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
      </form>
    </section>
  );
};

export default AddEntryForm;
