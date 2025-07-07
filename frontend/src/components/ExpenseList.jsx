import { useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import { TbFilter, TbPlus } from "react-icons/tb";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";
import ExpenseListFilter from "./ExpenseListFilter";
import OutsideClick from "./OutsideClick";
import { motion } from "framer-motion";
import AddEntryForm from "./AddEntryForm";

const ExpenseList = ({ categories }) => {
  const { tempEntries } = useSelector((state) => state.logs);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryNames = categories.map((cat) => cat.name);
      setSelectedCategories(categoryNames);
    }
  }, [categories]);

  const filteredList = tempEntries.filter((entry) =>
    selectedCategories.includes(entry.category.name)
  );

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, [selectedCategories, tempEntries]);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

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
        {isAdding && (
          <OutsideClick onOutsideClick={() => setIsAdding(false)}>
            <AddEntryForm
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
        <div className="flex gap-2">
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={() => setIsAdding(true)}
          >
            <TbPlus />
          </button>
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={() => setIsFiltering(true)}
          >
            <TbFilter />
          </button>
        </div>
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
          {isVisible &&
            filteredList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scaleY: 0.85 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <ExpenseListItem
                    expense={entry.expense}
                    amount={entry.amount}
                    category={entry.category.name}
                    timeStamps={entry.date.split("T")[0]}
                    bgColor={entry.category.color}
                    setIsEditing={setIsEditing}
                    setIsDeleting={setIsDeleting}
                    setEntry={setEntry}
                  />
                </motion.div>
              ))}
        </div>
      )}
    </section>
  );
};

export default ExpenseList;
