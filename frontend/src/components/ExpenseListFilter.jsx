import { TbCheck, TbX, TbSquareCheck, TbSquare } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ExpenseListFilter = ({ closeUI, props }) => {
  const { selectedCategories, setSelectedCategories } = props;
  const { tempCategories } = useSelector((state) => state.logs);
  const categoryNames = tempCategories.map((cat) => cat.name);
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
     dark:bg-[#313132] dark:shadow-none
      dark:border dark:border-[#282828]
      flex flex-col right-0 top-0 w-full 
      max-w-[80%] md:max-w-[15rem]"
    >
      <div className="log-section-header">
        <h3>Apply Filter</h3>
        <div className="flex gap-2">
          <button className="log-tool-button-2" onClick={handleConfirm}>
            <TbCheck />
          </button>
          <button className="log-tool-button-2" onClick={closeUI}>
            <TbX />
          </button>
        </div>
      </div>
      <menu className="p-2 rounded text-center text-base font-normal flex flex-col gap-1 ">
        {tempCategories.map((cat, index) => (
          <li
            key={index}
            className="flex 
            justify-start 
            items-center gap-1
            min-h-8
            active:scale-95"
            onClick={() => {
              handleSelect(cat.name);
            }}
          >
            <button className="text-3xl hover:translate-y-[-2px]">
              {selected.includes(cat.name) ? (
                <TbSquareCheck className="text-blue-800 dark:text-[#f0f0f0]" />
              ) : (
                <TbSquare className="text-slate-300" />
              )}
            </button>
            <div
              style={{ backgroundColor: cat.color }}
              className="flex items-center p-1 px-2 rounded w-full min-h-8 text-sm md:text-base dark:text-[#282828]"
            >
              {cat.name}
            </div>
          </li>
        ))}
        <li className="flex gap-1 justify-end items-center ">
          <button
            className="entry-button"
            onClick={() => {
              setSelected(categoryNames);
            }}
          >
            Select All
          </button>
          <button className="entry-button" onClick={() => setSelected([])}>
            Clear
          </button>
        </li>
      </menu>
    </div>
  );
};

export default ExpenseListFilter;
