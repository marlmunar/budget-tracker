import ExpenseSummaryItem from "./ExpenseSummaryItem";
import NoRecords from "./NoRecords";

const ExpenseSummary = () => {
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense Summary</h2>

      <NoRecords />
      <ExpenseSummaryItem category="Savings" amount="80000" />
      <ExpenseSummaryItem category="Needs" amount="300" />
    </section>
  );
};

export default ExpenseSummary;
