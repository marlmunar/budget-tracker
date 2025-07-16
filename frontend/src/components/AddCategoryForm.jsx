import { TbCheck, TbPlus, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddCategoryForm = ({ closeUI }) => {
  // const { categories } = props;
  const { tempCategories } = useSelector((state) => state.logs);
  const { logId } = useParams();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, type, color]);

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
    if (!name) return setError("Please fill out the name field");
    if (!type) return setError("Please select a type");
    if (!color) return setError("Please select a color");
    if (color.length < 7) return setError("Please complete the color code");

    const newCategory = { name, color, type };
    // const newCategories = [...categories, newCategory];
    // console.log(newCategories);

    // try {
    //   const res = await updateLog({
    //     id: logId,
    //     data: { categories: newCategories },
    //   }).unwrap();

    //   console.log(res);

    //   setName("");
    //   setColor("#000000");
    //   setActiveAction("Adding Entry");
    //   setLastAction(Date.now());
    // } catch (error) {
    //   console.log(error?.data?.message || error.message);
    // }
  };

  const handleChange = (newColor) => {
    if (!newColor.startsWith("#")) {
      newColor = "#" + newColor;
    }

    newColor = "#" + newColor.slice(1).replace(/[^0-9a-fA-F]/g, "");

    if (newColor.length > 7) {
      newColor = newColor.slice(0, 7);
    }

    const uppercase = newColor.toUpperCase();
    setColor(uppercase);
  };

  return (
    <section
      className="bg-white
      log-form-container w-full 
      absolute top-0
      shadow shadow-slate-400"
    >
      <div className="log-section-header">
        <h3>New Category</h3>
        <div className="flex gap-2">
          <button
            className="ml-auto log-tool-button h-10 w-10 bg-slate-200"
            type="submit"
            form="newCategoryForm"
            formNoValidate
          >
            <TbCheck />
          </button>
          <button
            className="ml-auto log-tool-button h-10 w-10 bg-slate-200"
            onClick={closeUI}
          >
            <TbX />
          </button>
        </div>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        id="newCategoryForm"
        className="relative p-2 rounded"
      >
        <div
          className="p-2 grid md:grid-cols-2 grid-cols-1
             gap-2 items-start"
        >
          <div className="flex flex-col gap-2">
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
            <div className="category-input-column row-start-2">
              <p>Expense Type:</p>
              <div className="radio flex gap-6">
                <label htmlFor="expense" className="radio-input">
                  <input
                    className="hidden"
                    type="radio"
                    id="expense"
                    name="expenseType"
                    value="Expense"
                    onClick={(e) => {
                      setType(e.target.value);
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
                    onClick={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  <div className="custom-radio">
                    <div></div>
                  </div>
                  Income
                </label>
              </div>
            </div>
          </div>
          <div className="category-input-column flex flex-col relative md:max-w-[95%]">
            <p>Color:</p>

            {isSelecting ? (
              <div className="flex flex-col gap-2">
                <div className=" flex gap-1 items-center justify-between">
                  <div
                    className="min-w-6 min-h-6 md:min-h-7 md:min-w-7 border-2 border-gray-200 rounded"
                    style={{ backgroundColor: color }}
                  ></div>
                  <input
                    type="text"
                    className="w-full flex-1"
                    value={color}
                    placeholder="#000000"
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <button
                    type="button"
                    className=" block color-button bg-gray-200 text-xl"
                    onClick={() => setIsSelecting((prev) => !prev)}
                  >
                    <TbX />
                  </button>
                </div>
                <div className="color-picker flex-1">
                  <HexColorPicker color={color} onChange={handleChange} />
                </div>
              </div>
            ) : (
              <menu className="color-menu py-1 overflow-x-auto md:py-0 md:overflow-x-visible">
                {colors.map((item, index) => (
                  <li key={item}>
                    <button
                      className={
                        item === color ? "border-2 border-amber-800" : ""
                      }
                      type="button"
                      style={{ backgroundColor: item }}
                      onClick={() => setColor(item)}
                    ></button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="bg-gray-200"
                    onClick={() => setIsSelecting((prev) => !prev)}
                  >
                    <TbPlus />
                  </button>
                </li>
              </menu>
            )}
          </div>
        </div>
        {error && <div className="px-2 error-message">{error}</div>}
        <button
          className="clear-button"
          type="reset"
          onClick={() => {
            setName("");
            setType("");
            setColor("");
          }}
        >
          Clear Values
        </button>
      </form>
    </section>
  );
};

export default AddCategoryForm;
