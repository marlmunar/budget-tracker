import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCheck,
  TbPlus,
  TbX,
} from "react-icons/tb";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useUpdateLogMutation } from "../slices/logsApiSlice";
import { useParams } from "react-router-dom";
import OutsideClick from "./OutsideClick";

const EditCategoryForm = ({ closeUI, props }) => {
  const { categories } = props;
  const { logId } = useParams();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isSelecting, setIsSelecting] = useState(false);
  const [isSelectingColor, setIsSelectingColor] = useState(false);
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

  const isEqual = (a, b) => {
    if (a === b) return true;

    if (
      typeof a !== "object" ||
      a === null ||
      typeof b !== "object" ||
      b === null
    )
      return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(selectedCategory).length === 0) return;
    if (!name) return setError("Please fill out the name field");
    if (!type) return setError("Please select a type");
    if (!color) return setError("Please select a color");
    if (color.length < 7) return setError("Please complete the color code");

    const updatedCategory = { name, color, type };
    if (isEqual(updatedCategory, selectedCategory)) return;

    const newCategories = categories.map((cat) =>
      cat.name === selectedCategory.name ? updatedCategory : cat
    );
    console.log(newCategories);
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
        <h3>Edit Category</h3>
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
        className="relative p-2 rounded space-y-2"
      >
        <div className="p-2 pb-1 log-input-column md:max-w-[50%]">
          <label htmlFor="newCategory">Category</label>
          <div
            className="relative custom-select focus:bg-gray-100/95 focus:shadow-lg"
            style={{ backgroundColor: selectedCategory?.color }}
            tabIndex={0}
          >
            <div
              className="py-1 flex justify-between 
                                items-center *:pointer-events-none"
              data-id="addEntry"
              onClick={() => setIsSelecting((prev) => !prev)}
              onFocus={() => setIsSelecting(true)}
            >
              <span
                className={
                  Object.keys(selectedCategory).length > 0
                    ? ""
                    : "text-gray-500"
                }
              >
                {Object.keys(selectedCategory).length > 0
                  ? selectedCategory.name
                  : "Select a category"}
              </span>
              <button
                className="flex rounded justify-between items-center"
                type="button"
              >
                {isSelecting ? <TbCaretUpFilled /> : <TbCaretDownFilled />}
              </button>
            </div>
            {isSelecting && (
              <OutsideClick
                onOutsideClick={() => setIsSelecting(false)}
                id="addEntry"
              >
                <menu
                  className="absolute right-0 top-9 rounded p-1 bg-slate-100
                        shadow shadow-slate-400 w-full flex flex-col gap-1 z-10"
                >
                  {categories.map((cat, index) => (
                    <li
                      className="log-options-2"
                      style={{ backgroundColor: cat.color }}
                      key={index}
                      onClick={() => {
                        setSelectedCategory({
                          name: cat.name,
                          color: cat.color,
                          type: cat.type,
                        });
                        setName(cat.name);
                        setColor(cat.color);
                        setType(cat.type);
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
        <div className="mx-2 border-2 border-slate-300"></div>
        <div className="p-2 py-1 grid md:grid-cols-2 grid-cols-1 items-start">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="category-input-column">
              <label htmlFor="name">New Name:</label>
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
                    checked={type === "Expense"}
                    onClick={(e) => {
                      setType(e.target.value);
                    }}
                    onChange={() => {}}
                  />
                  <div className="custom-radio">
                    <div></div>
                  </div>
                  Expense
                </label>

                <label className="radio-input">
                  <input
                    className="hidden"
                    type="radio"
                    id="income"
                    name="expenseType"
                    value="Income"
                    checked={type === "Income"}
                    onClick={(e) => {
                      setType(e.target.value);
                    }}
                    onChange={() => {}}
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

            {isSelectingColor ? (
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
                    className="color-button bg-gray-200 text-xl"
                    onClick={() => setIsSelectingColor((prev) => !prev)}
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
                    onClick={() => setIsSelectingColor((prev) => !prev)}
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
            setSelectedCategory({});
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

export default EditCategoryForm;
