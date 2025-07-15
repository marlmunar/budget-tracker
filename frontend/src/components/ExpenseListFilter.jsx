import { TbCheck, TbX, TbSquareCheck, TbSquare } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ExpenseListFilter = ({ closeUI, props }) => {
  const { categories, selectedCategories, setSelectedCategories } = props;
  const categoryNames = categories.map((cat) => cat.name);
  const [selected, setSelected] = useState(selectedCategories);

  const handleConfirm = () => {
    closeUI();
    setSelectedCategories(selected);
  };

  const handleSelect = (selectedCategory) => {
    if (selected.includes(selectedCategory)) {
      const newSelected = selected.filter((cat) => cat !== selectedCategory);
      setSelected(newSelected);

      return;
    }

    setSelected((prev) => [...prev, selectedCategory]);
  };

  return (
    <div
      className="absolute bg-white md:m-2
      shadow shadow-slate-400 rounded 
      flex flex-col right-0 top-0 w-full 
      max-w-[80%] md:max-w-[15rem]"
    >
      <div className="log-section-header">
        <h3>Apply Filter</h3>
        <div className="flex gap-2">
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={handleConfirm}
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
      <menu className="p-2 rounded text-center text-base font-normal flex flex-col gap-1 ">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex justify-start items-center gap-1
            min-h-8
            active:scale-95"
            onClick={() => {
              handleSelect(cat.name);
            }}
          >
            <button className="text-3xl hover:translate-y-[-2px]">
              {selected.includes(cat.name) ? (
                <TbSquareCheck className="text-blue-800" />
              ) : (
                <TbSquare className="text-slate-300" />
              )}
            </button>
            <div
              style={{ backgroundColor: cat.color }}
              className="p-1 rounded w-full min-h-8 text-sm md:text-base"
            >
              {cat.name}
            </div>
          </li>
        ))}
        <li className="flex gap-2 justify-end items-center ">
          <button
            className="text-blue-400 md:text-sm text-xs"
            onClick={() => {
              setSelected(categoryNames);
            }}
          >
            Select All
          </button>
          <button
            className="text-blue-400 md:text-sm text-xs"
            onClick={() => setSelected([])}
          >
            Reset
          </button>
        </li>
      </menu>
    </div>
  );
};

export default ExpenseListFilter;
