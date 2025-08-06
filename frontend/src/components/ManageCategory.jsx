import { TbPlus, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ManageCategory = ({ close, action, category, tempList, setTempList }) => {
  const categoryNames = tempList
    .filter((cat) => cat.name !== category?.name)
    .map((cat) => cat.name.toLowerCase());
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, type, color]);

  useEffect(() => {
    if (action === "edit") {
      setName(category.name);
      setColor(category.color);
      setType(category.type);
    }
  }, [action]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return setError("Please fill out the name field");
    if (!type) return setError("Please select a type");
    if (!color) return setError("Please select a color");
    if (color.length < 7) return setError("Please complete the color code");

    const newCategory = { name, color, type };

    if (isEqual(newCategory, category)) return close();
    if (categoryNames.includes(name.toLowerCase()))
      return setError("Category already exists");

    if (action === "add") {
      setTempList([...tempList, newCategory]);
    }
    if (action === "edit") {
      const newCategories = tempList.map((cat) =>
        cat.name === category.name ? newCategory : cat
      );
      setTempList(newCategories);
    }
    close();
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
    <form
      method="POST"
      onSubmit={handleSubmit}
      id="newCategory"
      className="relative rounded flex flex-col"
    >
      <div className="pb-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="modal-input-container">
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

          <div className="modal-input-container">
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

              <label htmlFor="income" className="radio-input">
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
        <div className="modal-input-container flex flex-col relative">
          <p>Color:</p>

          {isSelecting ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center justify-between">
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
        className="modal-clear-button"
        type="reset"
        onClick={() => {
          setName("");
          setType("");
          setColor("");
        }}
      >
        Clear Values
      </button>
      <div className="flex gap-2 justify-end">
        <button className="modal-action-button" formNoValidate>
          Save
        </button>
        <button type="button" onClick={close} className="modal-clean-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ManageCategory;
