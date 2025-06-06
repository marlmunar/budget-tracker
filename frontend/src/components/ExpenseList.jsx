import { useSelector } from "react-redux";
import { useState } from "react";
import { TbFilter } from "react-icons/tb";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";
import ExpenseListFilter from "./ExpenseListFilter";

const ExpenseList = ({ categories }) => {
  const { tempEntries } = useSelector((state) => state.logs);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

  return (
    <section className="log-section-container">
      <div className="log-section-header flex justify-between items-center">
        <h2>Expense List</h2>
        <button
          className="log-tool-button h-15"
          onClick={() => setIsFiltering(true)}
        >
          <TbFilter />
        </button>
      </div>
      {tempEntries.length < 1 ? (
        <NoRecords />
      ) : (
        <div className="relative">
          {isEditing && (
            <EditEntryForm
              categories={categories}
              setIsEditing={setIsEditing}
              entry={entry}
            />
          )}
          {isDeleting && (
            <DeleteEntryConfirm setIsDeleting={setIsDeleting} entry={entry} />
          )}
          {isFiltering && (
            <ExpenseListFilter
              setIsFiltering={setIsFiltering}
              categories={categories}
            />
          )}
          {tempEntries.map((entry, index) => (
            <ExpenseListItem
              key={index}
              expense={entry.expense}
              amount={entry.amount}
              category={entry.category.name}
              timeStamps={entry.date.split("T")[0]}
              bgColor={entry.category.color}
              setIsEditing={setIsEditing}
              setIsDeleting={setIsDeleting}
              setEntry={setEntry}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ExpenseList;
