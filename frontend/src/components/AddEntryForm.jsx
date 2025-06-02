import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";
import OutsideClick from "./OutsideClick";
import { useState } from "react";

const AddEntryForm = ({ categories }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <section className="log-section-container row-span-2 max-h-[16.8rem]">
      <h3 className="log-section-header">Log an Entry</h3>
      <form>
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="expense">Expense</label>
            <input
              type="text"
              name="expense"
              placeholder="Food"
              autoComplete="off"
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="100"
              autoComplete="off"
              step={0.01}
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="category">Category</label>
            <div className="relative custom-select">
              <div className="py-1 flex justify-between items-center">
                <span>
                  {!!selectedCategory ? selectedCategory : "Select a category"}
                </span>
                <button
                  className="flex rounded justify-between items-center hover:shadow shadow-slate-400 transition-all delay-300"
                  type="button"
                  data-info="exempted"
                  onClick={() => setIsSelecting((prev) => !prev)}
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
                        key={index}
                        onClick={() => {
                          setSelectedCategory(cat.name);
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
        <div className="button-row">
          <button type="submit">Save Entry</button>
          <button type="reset">Clear Values</button>
        </div>
      </form>
    </section>
  );
};

export default AddEntryForm;
