import { TbArrowLeft } from "react-icons/tb";
import { useState } from "react";

const AddCategoryForm = ({ setIsAddingCategory }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <h3>Log an Entry</h3>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="expense">Name</label>
            <input
              type="text"
              name="expense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              autoComplete="off"
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="amount">Color</label>
          </div>
        </div>
        <div className="button-row">
          <button type="submit">Save Category</button>
          <button
            type="reset"
            onClick={() => {
              setName("");
              setCategory("");
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
