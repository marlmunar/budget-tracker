import { TbArrowLeft, TbCheck, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useSelector } from "react-redux";

const DeleteCategoryForm = ({ closeUI, props }) => {
  const { categories } = props;
  const [tempCategories, setTempCategories] = useState(categories);
  const [error, setError] = useState("");

  const [updateLog, { isLoading }] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const activeCategories = [
    ...new Set(tempEntries.map((cat) => cat.category.name)),
  ];

  useEffect(() => {
    setError("");
  }, [tempCategories]);

  const handleClick = (selectedCategory) => {
    if (tempCategories.length === 1) {
      return setError("Categories cannot be empty");
    }

    if (activeCategories.includes(selectedCategory.name)) {
      return setError("Cannot delete a category in use");
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
      className="z-25 bg-white log-form-container 
      w-full absolute right-0 top-0 
      shadow shadow-slate-400
      max-w-[80%] md:max-w-[18rem] md:m-2"
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
        className="flex flex-col relative p-2 gap-1"
      >
        <menu className="rounded text-center text-base flex flex-col gap-1">
          {tempCategories.map((cat, index) => (
            <li
              key={index}
              className="flex 
            justify-start 
            items-center gap-1
            min-h-8"
            >
              <div
                className="flex items-center p-1 px-2 rounded w-full min-h-8 text-sm md:text-base"
                style={{ backgroundColor: cat.color }}
              >
                {cat.name}
              </div>
              <button
                type="button"
                className="text-xl border-2 rounded
                   text-red-400
                   hover:bg-red-300 
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                onClick={() => {
                  handleClick(cat);
                }}
              >
                <TbX />
              </button>
            </li>
          ))}
        </menu>
        {error && (
          <div className="mx-1 text-left text-red-500 md:text-sm text-xs">
            {error}
          </div>
        )}
        <button
          type="reset"
          className="entry-button"
          onClick={() => {
            setTempCategories(categories);
            setError("");
          }}
        >
          Reset Values
        </button>
      </form>
    </div>
  );
};

export default DeleteCategoryForm;
