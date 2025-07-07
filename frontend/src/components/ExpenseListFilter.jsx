import { TbCheck, TbX, TbSquareCheck, TbSquare } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ExpenseListFilter = ({
  setIsFiltering,
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const categoryNames = categories.map((cat) => cat.name);
  const [selected, setSelected] = useState(selectedCategories);

  const handleConfirm = () => {
    setIsFiltering(false);
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
    <div className="absolute bg-white m-2 shadow shadow-slate-400 rounded flex flex-col right-0 top-0 z-10">
      <div className="font-semibold text-lg px-2 pl-4 py-1 bg-gray-100 rounded shadow flex justify-between items-center">
        <h3 className="text-nowrap mr-5 text-base">Apply Filter</h3>
        <div className="py-2 flex gap-2 ">
          <button className="log-tool-button" onClick={handleConfirm}>
            <TbCheck />
          </button>
          <button
            className="log-tool-button"
            onClick={() => setIsFiltering(false)}
          >
            <TbX />
          </button>
        </div>
      </div>
      <menu className="pt-2 p-1 rounded text-center text-base font-normal flex flex-col gap-1">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex justify-start items-center gap-1 px-1 "
            onClick={() => {
              handleSelect(cat.name);
            }}
          >
            <button className="text-2xl h-full hover:translate-y-[-2px]">
              {selected.includes(cat.name) ? (
                <TbSquareCheck className="text-blue-800" />
              ) : (
                <TbSquare text-slate-400 className="text-slate-300" />
              )}
            </button>
            <div
              style={{ backgroundColor: cat.color }}
              className="p-1 rounded w-full text-sm"
            >
              {cat.name}
            </div>
          </li>
        ))}
        <li className="px-1 pb-1">
          <button
            className="entry-button my-1"
            onClick={() => {
              setSelected(categoryNames);
            }}
          >
            Select All
          </button>
          <button className="entry-button" onClick={() => setSelected([])}>
            Reset
          </button>
        </li>
      </menu>
    </div>
  );
};

export default ExpenseListFilter;
