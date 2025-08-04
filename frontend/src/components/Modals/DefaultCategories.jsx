import { TbCheck, TbPencil, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DefaultCategories = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { defaultCategories } = useSelector((state) => state.logs);
  const [tempList, setTempList] = useState(defaultCategories);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [tempList]);

  const handleClick = (selectedCategory) => {
    if (tempList.length === 1) {
      return setError("Categories cannot be empty");
    }

    const newCategories = tempList.filter((cat) => cat !== selectedCategory);
    setTempList(newCategories);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form
      method="POST"
      id="manageCategories"
      onSubmit={handleSubmit}
      className="flex flex-col relative gap-1"
    >
      <menu className="rounded text-center text-base flex flex-col gap-1">
        {tempList.map((cat, index) => (
          <li key={index} className="modal-input-container">
            <div
              className="flex items-center justify-between p-1 px-2 rounded w-full min-h-10 text-sm md:text-base"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
              <div className="space-x-1 flex items-center">
                <button
                  type="button"
                  className="text-xl p-1 rounded
                   text-blue-400
                   bg-white
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                >
                  <TbPencil />
                </button>
                <button
                  type="button"
                  className="text-xl p-1 rounded
                   text-red-400
                   bg-white
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                  onClick={() => {
                    handleClick(cat);
                  }}
                >
                  <TbX />
                </button>
              </div>
            </div>
          </li>
        ))}
      </menu>
      {error && (
        <div className="mx-1 text-left text-red-500 md:text-sm text-xs">
          {error}
        </div>
      )}
      <button className="modal-action-button" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default DefaultCategories;
