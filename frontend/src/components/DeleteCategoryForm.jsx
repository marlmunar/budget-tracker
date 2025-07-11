import { TbArrowLeft, TbX } from "react-icons/tb";
import { useState } from "react";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useSelector } from "react-redux";

const DeleteCategoryForm = ({
  logId,
  categories,
  setActiveAction,
  setLastAction,
}) => {
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
    <section className="log-form-container min-w-[min-content]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setActiveAction("")}
        >
          <TbArrowLeft />
        </button>
        <h3>Delete Categories</h3>
      </div>

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded mt-2 pb-2 lg:min-w-[22rem]"
      >
        <menu className="input-row flex flex-col gap-1.5 mb-2">
          {tempCategories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center shadow shadow-gray-400/50 bg-white rounded min-h-12 p-2"
              style={{ backgroundColor: cat.color }}
            >
              <span>{cat.name}</span>
              <div className="bg-white w-7 h-7 rounded flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClick(cat);
                  }}
                  className="text-xl border-2 rounded  text-red-400 hover:bg-red-300 hover:border-transparent hover:shadow shadow-gray-700/50 transition-all duration-300"
                >
                  <TbX />
                </button>
              </div>
            </li>
          ))}
        </menu>

        <div className="button-row">
          <button type="submit">Save Changes</button>
          <button
            type="reset"
            onClick={() => {
              setTempCategories(categories);
            }}
          >
            Reset Values
          </button>
        </div>
      </form>
    </section>
  );
};

export default DeleteCategoryForm;
