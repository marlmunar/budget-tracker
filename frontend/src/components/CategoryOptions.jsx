import { TbX } from "react-icons/tb";

const CategoryOptions = ({ closeUI, setActiveUi }) => {
  return (
    <section
      className="bg-white md:m-2
          log-form-container w-full 
          absolute top-0 right-[10%] md:right-0
          shadow shadow-slate-400
          max-w-[80%]
          md:max-w-[30%]"
    >
      <div className="log-section-header">
        <h3>Manage Categories</h3>
        <button
          className="ml-auto log-tool-button  h-8 w-8 md:h-10 md:w-10 bg-slate-200"
          onClick={closeUI}
        >
          <TbX />
        </button>
      </div>
      <menu className="category-menu">
        <li>
          <button onClick={() => setActiveUi("addCategory")}>
            Add New Category
          </button>
        </li>
        <li>
          <button onClick={() => setActiveUi("editCategories")}>
            Edit Categories
          </button>
        </li>
        <li>
          <button onClick={() => setActiveUi("deleteCategories")}>
            Delete Categories
          </button>
        </li>
      </menu>
    </section>
  );
};

export default CategoryOptions;
