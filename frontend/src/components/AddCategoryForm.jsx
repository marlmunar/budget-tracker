import { TbArrowLeft, TbCheck, TbX } from "react-icons/tb";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const AddCategoryForm = ({
  logId,
  categories,
  setActiveAction,
  setLastAction,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [error, setError] = useState("");

  const colors = [
    "#FF7F50",
    "#FF8DA1",
    "#FF6F91",
    "#FFB347",
    "#F7DC6F",
    "#AED581",
    "#82E0AA",
    "#40E0D0",
    "#7EC8E3",
    "#5DADE2",
    "#A569BD",
    "#C39BD3",
  ];

  const [updateLog, { isLoading }] = useUpdateLogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please fill out all fields");
      return;
    }
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
      setActiveAction("Adding Entry");
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
    <section
      className="bg-white log-form-container w-full 
     absolute top-0 
     shadow shadow-slate-400"
    >
      <div className="log-section-header">
        <h3>New Category</h3>
        <div className="flex gap-2">
          <button
            className="ml-auto log-tool-button h-10 w-10 bg-slate-200"
            type="submit"
            form="newEntryForm"
            formNoValidate
          >
            <TbCheck />
          </button>
          <button className="ml-auto log-tool-button h-10 w-10 bg-slate-200">
            <TbX />
          </button>
        </div>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative p-4 rounded "
      >
        <div className="input-row grid grid-cols-2 grid-rows-2 grid-flow-col gap-2">
          <div className="category-input-column">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              maxLength="25"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              autoComplete="off"
              required
            />
          </div>
          <div className="category-input-column">
            <p>Expense Type:</p>
            <div className="radio flex gap-6">
              <label htmlFor="expense" className="radio-input">
                <input
                  className="hidden"
                  type="radio"
                  id="expense"
                  name="expenseType"
                  value="Expense"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <div className="custom-radio">
                  <div></div>
                </div>
                Expense
              </label>

              <label htmlFor="income" className="radio-input">
                <input
                  className="hidden"
                  type="radio"
                  id="income"
                  name="expenseType"
                  value="Income"
                  onChange={(e) => console.log(e.target.value)}
                />
                <div className="custom-radio">
                  <div></div>
                </div>
                Income
              </label>
            </div>
          </div>
          <div className="category-input-column">
            <p>Color:</p>
            <menu className="color-menu">
              {colors.map((color, index) => (
                <li>
                  <button
                    type="button"
                    style={{ backgroundColor: color }}
                  ></button>
                </li>
              ))}
            </menu>
          </div>
          {/* <div className="input-column">
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
          </div> */}
        </div>

        {/* <div className="text-right my-2 mr-5 text-red-500 text-sm">{error}</div> */}
        {/* <div className="button-row">
          <button formNoValidate type="submit">
            Save Category
          </button>
          <button
            type="reset"
            onClick={() => {
              setName("");
              setColor("#000000");
            }}
          >
            Clear Values
          </button>
        </div> */}
      </form>
    </section>
  );
};

export default AddCategoryForm;
