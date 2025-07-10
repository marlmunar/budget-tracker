import { useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import { TbFilter, TbFilterEdit, TbPlus } from "react-icons/tb";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";
import EditEntryForm from "./EditEntryForm";
import DeleteEntryConfirm from "./DeleteEntryConfirm";

import OutsideClick from "./OutsideClick";
import { motion } from "framer-motion";

import ExpenseListUIHandler from "./ExpenseListUIHandler";

const ExpenseList = ({ props }) => {
  const { categories, selectedCategories, setSelectedCategories } = props;
  const { tempEntries } = useSelector((state) => state.logs);
  const [activeUI, setActiveUI] = useState("");

  useEffect(() => {
    if (categories.length > 0) {
      const categoryNames = categories.map((cat) => cat.name);
      setSelectedCategories(categoryNames);
    }
  }, [categories, setSelectedCategories]);

  const filteredList = tempEntries.filter((entry) =>
    selectedCategories.includes(entry.category.name)
  );

  useEffect(() => {
    console.log(tempEntries);
  }, [selectedCategories, tempEntries]);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

  return (
    <section className="log-section-container md:relative">
      <ExpenseListUIHandler
        activeUI={activeUI}
        setActiveUi={setActiveUI}
        props={{ entry, categories, selectedCategories, setSelectedCategories }}
      />

      <div className="log-section-header flex justify-between items-center">
        <h2 className="h-10 flex items-center">Expense List</h2>

        {!activeUI && (
          <div className="flex gap-2">
            <button
              className="log-tool-button h-10 w-10 bg-slate-200"
              onClick={() => setActiveUI("addEntry")}
            >
              <TbPlus />
            </button>
            <button
              className="log-tool-button h-10 w-10 bg-slate-200"
              onClick={() => setActiveUI("filterEntries")}
            >
              {categories.length > selectedCategories.length ? (
                <TbFilterEdit />
              ) : (
                <TbFilter />
              )}
            </button>
          </div>
        )}
      </div>

      {filteredList.length < 1 ? (
        <NoRecords />
      ) : (
        <div className="relative mt-1">
          {filteredList
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry, index) => (
              <ExpenseListItem
                key={index}
                expense={entry.expense}
                amount={entry.amount}
                category={entry.category}
                timeStamps={entry.date.split("T")[0]}
                setEntry={setEntry}
                setActiveUI={setActiveUI}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default ExpenseList;
