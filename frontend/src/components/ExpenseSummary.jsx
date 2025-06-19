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
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense Summary</h2>

      {entries.length > 0 ? (
        <>
          <div className="flex justify-between px-2 pt-2 font-semibold text-lg md:text-xl">
            <h3>{`Entries: ${entries.length}`}</h3>
            <h3>{`Total: ${entries.reduce(
              (sum, entry) => +entry.amount + sum,
              0
            )}`}</h3>
          </div>
          <div className="flex text-gray-600 justify-between px-2 pb-1 font-semibold text-base md:text-lg">
            <h3>Category</h3>
            <h3>Subtotal</h3>
          </div>
          {sumPerCategory.map((item, index) => (
            <ExpenseSummaryItem
              key={index}
              category={item.category}
              amount={item.amount}
            />
          ))}
        </>
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
