import React from "react";
import OutsideClick from "./OutsideClick";
import AddEntryForm from "./AddEntryForm";
import ExpenseListFilter from "./ExpenseListFilter";
import EditEntryForm from "./EditEntryForm";
import EditCategoryForm from "./EditCategoryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";
import DeleteCategoryForm from "./DeleteCategoryForm";
import AddCategoryForm from "./AddCategoryForm";
import CategoryOptions from "./CategoryOptions";

const ExpenseListUIHandler = ({ activeUI, setActiveUi, props }) => {
  const closeUI = () => {
    setActiveUi("");
  };

  const UIs = {
    addEntry: (
      <AddEntryForm closeUI={closeUI} props={props} setActiveUi={setActiveUi} />
    ),
    filterEntries: <ExpenseListFilter closeUI={closeUI} props={props} />,
    editEntry: <EditEntryForm closeUI={closeUI} props={props} />,
    deleteEntry: <DeleteEntryConfirm closeUI={closeUI} props={props} />,
    manageCategories: (
      <CategoryOptions closeUI={closeUI} setActiveUi={setActiveUi} />
    ),
    addCategory: <AddCategoryForm closeUI={closeUI} props={props} />,
    editCategories: <EditCategoryForm closeUI={closeUI} props={props} />,
    deleteCategories: <DeleteCategoryForm />,
  };

  const getUI = () => UIs[activeUI] || null;

  return (
    <>
      {activeUI && (
        <div className="top-0 right-0 absolute h-full w-full bg-gray-300/75 z-10 md:sticky">
          <div className="sticky bottom-0 md:static m-2 mx-4 md:m-0 top-[20%]">
            <OutsideClick onOutsideClick={() => setActiveUi("")}>
              {getUI()}
            </OutsideClick>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseListUIHandler;
