import { useSelector } from "react-redux";
import { useState } from "react";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";

const ExpenseList = ({ categories }) => {
  const { tempEntries } = useSelector((state) => state.logs);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense List</h2>
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
