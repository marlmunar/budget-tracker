import ExpenseCard from "./ExpenseCard";
import NoRecords from "./NoRecords";

const ExpenseList = () => {
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense List</h2>

      <NoRecords />
      <ExpenseCard name="Food 1" amount="300" category="Needs" />
      <ExpenseCard name="Savings 2" amount="40000" category="Savings" />
      <ExpenseCard name="Savings 3" amount="40000" category="Savings" />
    </section>
  );
};

export default ExpenseList;
