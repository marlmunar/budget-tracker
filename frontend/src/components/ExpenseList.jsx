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
  const { selectedCategories, setSelectedCategories } = props;
  const { tempCategories } = useSelector((state) => state.logs);
  const { tempEntries } = useSelector((state) => state.logs);
  const [activeUI, setActiveUI] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (tempCategories?.length > 0) {
      const categoryNames = tempCategories.map((cat) => cat.name);
      setSelectedCategories(categoryNames);
    }
  }, [tempCategories, setSelectedCategories]);

  useEffect(() => {
    const list = tempEntries
      ?.filter((entry) => selectedCategories.includes(entry.category.name))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredList(list);
  }, [tempEntries, selectedCategories]);

  const [entry, setEntry] = useState({
    expense: "",
    amount: "",
    category: { name: "", color: "" },
  });

  return (
    <section className="log-section-container md:relative dark:bg-[#1f1f1f]">
      <ExpenseListUIHandler
        activeUI={activeUI}
        setActiveUi={setActiveUI}
        props={{ entry, ...props }}
      />

      <div className="log-section-header flex justify-between items-center">
        <h2 className="h-10 flex items-center">Entry List</h2>

        {!activeUI && (
          <div className="flex gap-2">
            <button
              className="log-tool-button-2 "
              onClick={() => setActiveUI("addEntry")}
            >
              <TbPlus />
            </button>
            <button
              className="log-tool-button-2"
              onClick={() => setActiveUI("filterEntries")}
            >
              {tempCategories?.length > selectedCategories?.length ? (
                <TbFilterEdit />
              ) : (
                <TbFilter />
              )}
            </button>
          </div>
        )}
      </div>

      {filteredList?.length < 1 ? (
        <NoRecords />
      ) : (
        <div className="rounded relative py-2 dark:bg-[#1f1f1f]">
          {filteredList.map((entry, index) => (
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
