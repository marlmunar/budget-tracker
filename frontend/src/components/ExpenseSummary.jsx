import ExpenseSummaryItem from "./ExpenseSummaryItem";
import NoRecords from "./NoRecords";

const ExpenseSummary = ({ entries }) => {
  const uniqueCategories = [
    ...new Set(entries.map((cat) => cat.category.name)),
  ];
  const sumPerCategory = uniqueCategories
    .map((cat) => ({
      category: cat,
      amount: entries.reduce((acc, entry) => {
        return entry.category.name === cat ? acc + +entry.amount : acc;
      }, 0),
    }))
    .sort((a, b) => b.amount - a.amount);
  console.log(sumPerCategory);
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense Summary</h2>

      {entries.length > 0 ? (
        sumPerCategory.map((item, index) => (
          <ExpenseSummaryItem
            key={index}
            category={item.category}
            amount={item.amount}
          />
        ))
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
