import { TbCheck, TbX, TbCheckbox, TbSquare } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";
import { useState } from "react";

const ExpenseListFilter = ({ setIsFiltering, categories }) => {
  const dispatch = useDispatch();

  const categoryNames = categories.map((cat) => cat.name);
  console.log(categoryNames);
  const { tempEntries } = useSelector((state) => state.logs);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleConfirm = () => {
    dispatch(setTempEntries());
    setIsFiltering(false);
    dispatch(setIsNotSaved(true));
  };

  const handleSelect = (selected) => {
    console.log(selected);
    if (selectedCategories.includes(selected)) {
      const newSelectedCategories = selectedCategories.filter(
        (cat) => cat !== selected
      );
      console.log(newSelectedCategories);
    }

    setSelectedCategories((prev) => [...prev, selected]);
  };

  return (
    <div className="sticky top-5">
      <div className="absolute bg-white p-2 shadow-xl rounded flex flex-col gap-2 right-0 top-0">
        <div className="lg:w-[min-content] bg-slate-500 p-4 rounded">
          <div className="font-semibold text-lg bg-slate-400 p-2 rounded flex justify-between items-center">
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
          <menu className="bg-slate-100 p-1 rounded mt-2 text-center">
            {categoryNames.map((cat, index) => (
              <li
                key={index}
                className="flex justify-start items-center gap-1 px-1 text-lg"
                onClick={() => {
                  handleSelect(cat);
                }}
              >
                <button>
                  {selectedCategories.includes(cat) ? (
                    <TbCheckbox />
                  ) : (
                    <TbSquare />
                  )}
                </button>
                <div>{cat}</div>
              </li>
            ))}
          </menu>
        </div>
      </div>
    </div>
  );
};

export default ExpenseListFilter;
