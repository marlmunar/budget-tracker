import { TbArrowLeft, TbX } from "react-icons/tb";
import { useState } from "react";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const DeleteCategoryForm = ({
  logId,
  categories,
  setIsDeletingCategory,
  setLastAction,
}) => {
  const [tempCategories, setTempCategories] = useState(categories);

  const [updateLog, { isLoading }] = useUpdateLogMutation();

  const handleClick = (selectedCategory) => {
    if (tempCategories.length > 1) {
      const newTempCategories = tempCategories.filter(
        (cat) => cat !== selectedCategory
      );
      setTempCategories(newTempCategories);
      return;
    }

    console.error("Categories cannot be empty");
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
    <section className="log-section-container row-span-2 max-h-[min-content] min-w-[calc(0.25*100vw)]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setIsDeletingCategory(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Delete Categories</h3>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
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
