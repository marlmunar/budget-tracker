import { useState } from "react";
import {
  TbTrash,
  TbEdit,
  TbCheck,
  TbX,
  TbCaretUpFilled,
  TbCaretDownFilled,
} from "react-icons/tb";
import OutsideClick from "./OutsideClick";

const EditEntryForm = ({ categories }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className="sticky top-5">
      <div className="absolute bg-white p-2 shadow-xl rounded flex flex-col gap-2 right-0 top-0">
        <div className="lg:w-[min-content] bg-slate-500 p-4 rounded">
          <div className="font-semibold text-xl bg-slate-400 p-2 rounded flex justify-between items-center">
            <h3>Edit Entry</h3>
            <div className="py-2 flex gap-2 ">
              <button className="log-tool-button">
                <TbCheck />
              </button>
              <button className="log-tool-button">
                <TbX />
              </button>
            </div>
          </div>
          <form method="POST" className="edit-entry-form">
            <div className="input-row">
              <label htmlFor="expense">Expense</label>
              <input
                type="text"
                name="expense"
                className="border-2"
                autoComplete="off"
                required
              />
            </div>
            <div className="input-row">
              <label htmlFor="expense">Amount</label>
              <input
                type="number"
                name="expense"
                className="border-2"
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
