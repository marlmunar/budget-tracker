import { useSelector } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";

const ExpenseList = () => {
  const { tempEntries } = useSelector((state) => state.logs);
  console.log(tempEntries);
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense List</h2>
      {tempEntries.length < 1 ? (
        <NoRecords />
      ) : (
        tempEntries.map((entry, index) => (
          <ExpenseListItem
            key={index}
            name={entry.expense}
            amount={entry.amount}
            category={entry.category.name}
            timeStamps={entry.date}
            bgColor={entry.category.color}
          />
        ))
      )}
    </section>
  );
};

export default ExpenseList;
