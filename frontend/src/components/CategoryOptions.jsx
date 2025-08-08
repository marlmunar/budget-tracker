import { TbPencil, TbPlus, TbTrash, TbX } from "react-icons/tb";

const CategoryOptions = ({ closeUI, setActiveUi }) => {
  return (
    <section
      className="absolute bg-white md:m-2
      shadow shadow-slate-400 rounded 
     dark:bg-[#313132] dark:shadow-none 
      dark:border dark:border-[#282828]
      flex flex-col right-0 top-0 w-full 
      max-w-[80%] md:max-w-[15rem]"
    >
      <div className="log-section-header">
        <h3>Manage Categories</h3>
        <button className="ml-auto log-tool-button-2" onClick={closeUI}>
          <TbX />
        </button>
      </div>
      <menu className="category-options">
        <li>
          <button onClick={() => setActiveUi("addCategory")}>
            <TbPlus />
            <span>Add New Category</span>
          </button>
        </li>
        <li>
          <button onClick={() => setActiveUi("editCategories")}>
            <TbPencil />
            <span>Edit Categories</span>
          </button>
        </li>
        <li>
          <button onClick={() => setActiveUi("deleteCategories")}>
            <TbTrash />
            <span>Delete Categories</span>
          </button>
        </li>
      </menu>
    </section>
  );
};

export default CategoryOptions;
