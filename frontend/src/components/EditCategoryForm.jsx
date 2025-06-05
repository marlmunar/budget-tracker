import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbArrowLeft,
} from "react-icons/tb";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import OutsideClick from "./OutsideClick";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";

const EditCategoryForm = ({
  logId,
  categories,
  setIsEditingCategories,
  setLastAction,
}) => {
  const dispatch = useDispatch();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const [updateLog, { isLoading }] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCategory = { name, color };
    const newCategories = categories.map((cat) =>
      cat.name === selectedCategory ? updatedCategory : cat
    );
    const newTempEntries = tempEntries.map((entry) =>
      entry.category.name === selectedCategory
        ? { ...entry, category: updatedCategory }
        : entry
    );

    try {
      const res = await updateLog({
        id: logId,
        data: { categories: newCategories },
      }).unwrap();

      console.log(res);

      setName("");
      setColor("#000000");
      setSelectedCategory("");
      setLastAction(Date.now());
      dispatch(setTempEntries(newTempEntries));
      dispatch(setIsNotSaved(true));
      setIsEditingCategories(false);
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
          onClick={() => setIsEditingCategories(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Edit Categories</h3>
      </div>

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded mt-2 pb-2 lg:min-w-[22rem]"
      >
        <div className="input-row">
          <div className="text-lg font-semibold">Old Value</div>
          <div className="input-column">
            <label htmlFor="category">Category</label>
            <div className="relative custom-select">
              <div
                className="py-1 flex justify-between items-center *:pointer-events-none"
                data-info="exempted"
                onClick={() => setIsSelecting((prev) => !prev)}
              >
                <span className={!!selectedCategory ? "" : "text-gray-500"}>
                  {!!selectedCategory ? selectedCategory : "Select a category"}
                </span>
                <button
                  className="flex rounded justify-between items-center"
                  type="button"
                >
                  {isSelecting ? <TbCaretUpFilled /> : <TbCaretDownFilled />}
                </button>
              </div>
              {isSelecting && (
                <OutsideClick onOutsideClick={() => setIsSelecting(false)}>
                  <menu className="absolute right-0 rounded mt-2 p-2 bg-white border-2 w-full flex flex-col gap-1 z-10">
                    {categories.map((cat, index) => (
                      <li
                        className="log-options"
                        style={{ backgroundColor: cat.color }}
                        key={index}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setName(cat.name);
                          setColor(cat.color);
                          setIsSelecting(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </menu>
                </OutsideClick>
              )}
            </div>
          </div>
          <div className="text-lg my-2 font-semibold">New Value</div>
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
              setSelectedCategory("");
            }}
          >
            Clear Values
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCategoryForm;
