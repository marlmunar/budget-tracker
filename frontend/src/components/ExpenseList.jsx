import ExpenseListItem from "./ExpenseListItem";
import NoRecords from "./NoRecords";

const ExpenseList = () => {
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense List</h2>

      <NoRecords />
      <ExpenseListItem
        name="Food 1"
        amount="300"
        category="Needs"
        timeStamps="05/07/2025"
        bgColor="#FFEB3B"
      />
      <ExpenseListItem
        name="Savings 2"
        amount="40000"
        category="Savings"
        timeStamps="05/05/2025"
      />
      <ExpenseListItem
        name="Savings 1"
        amount="40000"
        category="Savings"
        timeStamps="05/01/2025"
      />
    </section>
  );
};

export default ExpenseList;
