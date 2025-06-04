import { TbArrowLeft } from "react-icons/tb";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const AddCategoryForm = ({
  logId,
  categories,
  setIsAddingCategory,
  setLastAction,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const [updateLog, { isLoading }] = useUpdateLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { name, color };
    const newCategories = [...categories, newCategory];
    try {
      const res = await updateLog({
        id: logId,
        data: { categories: newCategories },
      }).unwrap();

      console.log(res);

      setName("");
      setColor("#000000");
      setLastAction(Date.now());
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  const handleChange = (newColor) => {
    const uppercase = newColor.toUpperCase();
    setColor(uppercase);
  };

  return (
    <section className="log-form-container min-w-[min-content]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setIsAddingCategory(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Add a Category</h3>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded mt-2 pb-2 lg:min-w-[22rem]"
      >
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              autoComplete="off"
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="color">Color:</label>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <input
                  type="text"
                  value={color}
                  placeholder="#000000"
                  onChange={(e) => handleChange(e.target.value)}
                />
                <div
                  className="absolute top-1 right-1 w-6 h-6 border rounded"
                  style={{ backgroundColor: color }}
                ></div>
              </div>

              <div className="color-picker">
                <HexColorPicker color={color} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="button-row">
          <button type="submit">Save Category</button>
          <button
            type="reset"
            onClick={() => {
              setName("");
              setColor("#000000");
            }}
          >
            Clear Values
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCategoryForm;
