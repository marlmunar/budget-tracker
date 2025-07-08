import React from "react";
import OutsideClick from "./OutsideClick";
import AddEntryForm from "./AddEntryForm";
import ExpenseListFilter from "./ExpenseListFilter";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";

const ExpenseListUIHandler = ({ activeUI, setActiveUi, props }) => {
  const closeUI = () => {
    setActiveUi("");
  };

  const UIs = {
    addEntry: <AddEntryForm closeUI={closeUI} props={props} />,
    filterEntries: <ExpenseListFilter closeUI={closeUI} props={props} />,
    editEntry: <EditEntryForm closeUI={closeUI} props={props} />,
    deleteEntry: <DeleteEntryConfirm closeUI={closeUI} props={props} />,
  };

  const getUI = () => UIs[activeUI] || null;

  return (
    <>
      {activeUI && (
        <div className="sticky top-5 z-10">
          <OutsideClick onOutsideClick={() => setActiveUi("")}>
            {getUI()}
          </OutsideClick>
        </div>
      )}
    </>
  );
};

export default ExpenseListUIHandler;
