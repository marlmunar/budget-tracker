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

  const getTop = () => {
    if (activeUI === "filterEntries") return "20px";
    return "30%";
  };

  return (
    <>
      {activeUI && (
        <div className="top-0 right-0 absolute h-full w-full bg-gray-300/75 z-10 md:sticky">
          <div
            className="sticky bottom-0 md:static m-2 mx-4 md:m-0"
            style={{ top: getTop() }}
          >
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
