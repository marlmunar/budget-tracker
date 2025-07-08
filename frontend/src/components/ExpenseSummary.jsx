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

  const formatNumber = (value) => {
    if (!value) return "0";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return trimmedDecimal ? `${formattedInt}.${trimmedDecimal}` : formattedInt;
  };

  return (
    <section className="log-section-container">
      <div className="log-section-header">
        <h2 className="h-10 flex items-center">Expense Summary</h2>
      </div>

      {entries.length > 0 ? (
        <div className="p-2">
          <div className="flex bg-slate-200 p-2 rounded text-gray-800 justify-between font-semibold">
            <h3>Category</h3>
            <h3>Subtotal</h3>
          </div>
          {sumPerCategory.map((item, index) => (
            <ExpenseSummaryItem
              key={index}
              category={item.category}
              amount={formatNumber(item.amount)}
            />
          ))}
          <div className="flex bg-slate-200 p-2 rounded text-gray-800 justify-between font-semibold mb-2">
            <h3>Total</h3>
          </div>
          <div className="flex justify-between shadow p-2 rounded">
            <p className="font-semibold">
              {`${entries.length} ${entries.length > 1 ? "entries" : "entry"}`}
            </p>
            <p>
              {formatNumber(
                entries.reduce((sum, entry) => +entry.amount + sum, 0)
              )}
            </p>
          </div>
        </div>
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
