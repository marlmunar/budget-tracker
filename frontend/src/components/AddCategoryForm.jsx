import { TbArrowLeft } from "react-icons/tb";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const AddCategoryForm = ({ setIsAddingCategory }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (newColor) => {
    const uppercase = newColor.toUpperCase();
    setColor(uppercase);
  };

  return (
    <section className="log-section-container row-span-2 max-h-[min-content] min-w-[calc(0.25*100vw)]">
      <div className="log-section-header">
        <button
          className="log-tool-button my-1 mr-2.5"
          onClick={() => setIsAddingCategory(false)}
        >
          <TbArrowLeft />
        </button>
        <h3>Add a Category</h3>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="color">Color</label>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={color}
                placeholder="#000000"
                onChange={(e) => handleChange(e.target.value)}
              />
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
