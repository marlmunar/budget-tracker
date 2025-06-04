import { TbArrowLeft, TbX } from "react-icons/tb";
import { useState } from "react";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const DeleteCategoryForm = ({
  logId,
  categories,
  setIsDeletingCategory,
  setLastAction,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const [updateLog, { isLoading }] = useUpdateLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { name, color };
    const newCategories = categories.map((cat) =>
      cat.name === selectedCategory ? newCategory : cat
    );
    // try {
    //   const res = await updateLog({
    //     id: logId,
    //     data: { categories: newCategories },
    //   }).unwrap();

    //   console.log(res);

    //   setName("");
    //   setColor("#000000");
    //   setSelectedCategory("");
    //   setLastAction(Date.now());
    // } catch (error) {
    //   console.log(error?.data?.message || error.message);
    // }
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
        <menu className="input-row">
          <li className="flex justify-between items-center shadow shadow-gray-400/50 bg-white rounded min-h-12 p-2">
            <span>Category 1</span>
            <button className="text-xl border-2 rounded  text-red-500 hover:bg-red-300 hover:border-transparent hover:shadow shadow-gray-700/50 transition-all duration-300">
              <TbX />
            </button>
          </li>
        </menu>

        <div className="button-row">
          <button type="submit">Save Changes</button>
          <button
            type="reset"
            onClick={() => {
              setName("");
              setColor("#000000");
              setSelectedCategory("");
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
