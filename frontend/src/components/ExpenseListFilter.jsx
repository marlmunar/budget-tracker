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
    <div className="absolute bg-white p-1 shadow-xl rounded flex flex-col gap-2 right-0 top-0 z-10">
      <div className="lg:w-[min-content] bg-slate-500 p-4 rounded flex flex-col gap-1">
        <div className="font-semibold text-lg bg-slate-400 px-2 rounded flex justify-between items-center">
          <h3 className="text-nowrap mr-5">Apply Filter</h3>
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
        <menu className="bg-slate-100 p-1 rounded mt-2 text-center text-base font-normal flex flex-col gap-1">
          {categoryNames.map((cat, index) => (
            <li
              key={index}
              className="flex justify-start items-center gap-1 px-1"
              onClick={() => {
                handleSelect(cat);
              }}
            >
              <button className="text-2xl">
                {selected.includes(cat) ? <TbSquareCheck /> : <TbSquare />}
              </button>
              <div>{cat}</div>
            </li>
          ))}
          <li>
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
    </div>
  );
};

export default ExpenseListFilter;
