import { TbArrowLeft, TbCheck, TbX } from "react-icons/tb";
import { useState } from "react";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useSelector } from "react-redux";

const DeleteCategoryForm = ({ closeUI, props }) => {
  const { categories } = props;
  const [tempCategories, setTempCategories] = useState(categories);

  const [updateLog, { isLoading }] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const activeCategories = [
    ...new Set(tempEntries.map((cat) => cat.category.name)),
  ];

  const handleClick = (selectedCategory) => {
    if (tempCategories.length < 0) {
      console.error("Categories cannot be empty");
      return;
    }
    if (activeCategories.includes(selectedCategory.name)) {
      console.error("Cannot delete a category in use");
      return;
    }

    const newTempCategories = tempCategories.filter(
      (cat) => cat !== selectedCategory
    );
    setTempCategories(newTempCategories);
    return;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateLog({
        id: logId,
        data: { categories: tempCategories },
      }).unwrap();

      console.log(res);

      setLastAction(Date.now());
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  return (
    <div
      className="z-25 bg-white l
      og-form-container w-full absolute 
      right-0 top-0 shadow shadow-slate-400
      max-w-[80%] md:max-w-[20rem] md:m-2"
    >
      <div className="log-section-header">
        <h3>Delete Categories</h3>
        <div className="flex gap-2">
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            type="submit"
            form="editForm"
            formNoValidate
            // onClick={handleSave}
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

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col relative p-2"
      >
        <menu className="input-row flex flex-col gap-1.5 mb-2">
          {tempCategories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center shadow shadow-gray-400/50
              bg-white rounded min-h-8 p-2
              hover:translate-y-[-2px] transition-all duration-300"
              style={{ backgroundColor: cat.color }}
            >
              <span>{cat.name}</span>
              <div className="bg-white w-7 h-7 rounded flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClick(cat);
                  }}
                  className="text-xl border-2 rounded
                   text-red-400
                   hover:bg-red-300 
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                >
                  <TbX />
                </button>
              </div>
            </li>
          ))}
        </menu>

        <button
          type="reset"
          className="text-blue-400 md:text-sm text-xs self-end"
          onClick={() => {
            setTempCategories(categories);
          }}
        >
          Reset Values
        </button>
      </form>
    </div>
  );
};

export default DeleteCategoryForm;
