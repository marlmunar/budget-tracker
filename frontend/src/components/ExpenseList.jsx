import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TbFilter } from "react-icons/tb";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";
import ExpenseListFilter from "./ExpenseListFilter";
import OutsideClick from "./OutsideClick";

const ExpenseList = ({ categories }) => {
  const { tempEntries } = useSelector((state) => state.logs);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryNames = categories.map((cat) => cat.name);
      setSelectedCategories(categoryNames);
    }
  }, [categories]);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

  const filteredList = tempEntries.filter((entry) =>
    selectedCategories.includes(entry.category.name)
  );

  return (
    <section className="log-section-container">
      <div className="relative">
        {isFiltering && (
          <OutsideClick onOutsideClick={() => setIsFiltering(false)}>
            <ExpenseListFilter
              setIsFiltering={setIsFiltering}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </OutsideClick>
        )}
      </div>
      <div className="log-section-header flex justify-between items-center">
        <h2>Expense List</h2>
        <button
          className="log-tool-button h-15"
          onClick={() => setIsFiltering(true)}
        >
          <TbFilter />
        </button>
      </div>

      {filteredList.length < 1 ? (
        <NoRecords />
      ) : (
        <div className="relative">
          {isEditing && (
            <OutsideClick onOutsideClick={() => setIsEditing(false)}>
              <EditEntryForm
                categories={categories}
                setIsEditing={setIsEditing}
                entry={entry}
              />
            </OutsideClick>
          )}
          {isDeleting && (
            <OutsideClick onOutsideClick={() => setIsDeleting(false)}>
              <DeleteEntryConfirm setIsDeleting={setIsDeleting} entry={entry} />
            </OutsideClick>
          )}
          {filteredList
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry, index) => (
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
