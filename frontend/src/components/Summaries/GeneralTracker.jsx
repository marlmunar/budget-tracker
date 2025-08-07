import { useSelector } from "react-redux";
import ExpenseSummaryItem from "../ExpenseSummaryItem";

const GeneralTracker = ({ props }) => {
  const {
    filteredList,
    formatNumber,
    displayReload,
    setDisplayReload,
    setSelectedCategories,
  } = props;
  const { tempCategories } = useSelector((state) => state.logs);

  const entriesCount = filteredList.reduce((sum, entry) => sum + 1, 0);

  const totalIncome = filteredList.reduce(
    (sum, entry) =>
      sum + (entry.category.type === "Income" ? +entry.amount : 0),
    0
  );

  const totalExpense = filteredList.reduce(
    (sum, entry) =>
      sum + (entry.category.type === "Expense" ? +entry.amount : 0),
    0
  );

  const total = filteredList.reduce((sum, entry) => sum + +entry.amount, 0);

  const getCount = (name) => {
    return filteredList.reduce(
      (sum, entry) => sum + (entry.category.name === name ? 1 : 0),
      0
    );
  };

  const getAmount = (name) => {
    return filteredList.reduce(
      (sum, entry) => sum + (entry.category.name === name ? +entry.amount : 0),
      0
    );
  };

  const sumPerCategory = tempCategories
    .map((cat) => ({
      category: cat,
      count: getCount(cat.name),
      amount: getAmount(cat.name),
    }))
    .filter((entry) => entry.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
    <>
      <div className="flex bg-slate-200 dark:bg-[#3a3a3a] dark:text-[#f0f0f0] p-2 rounded text-gray-800 justify-between font-semibold">
        <h3>Category</h3>
        <h3>Subtotal</h3>
      </div>
      {sumPerCategory.map((entry, index) => (
        <ExpenseSummaryItem
          key={index}
          category={entry.category}
          count={formatNumber(entry.count)}
          amount={formatNumber(entry.amount)}
          setSelectedCategories={setSelectedCategories}
          setDisplayReload={setDisplayReload}
        />
      ))}
      {!displayReload && (
        <div className="rounded shadow bg-slate-200 dark:bg-[#3a3a3a] dark:text-[#f0f0f0]">
          <div className="flex text-base md:text-lg p-2 text-gray-800 dark:text-[#f0f0f0] justify-between font-semibold">
            <h3>Total</h3>
          </div>
          <div className="text-xs md:text-sm flex justify-between p-2 bg-white dark:bg-[#4a4e53]">
            <p>Income</p>
            <p>{formatNumber(totalIncome)}</p>
          </div>
          <div className="text-xs md:text-sm flex justify-between p-2 bg-white dark:bg-[#4a4e53]">
            <p>Expense</p>
            <p>{formatNumber(totalExpense)}</p>
          </div>
          <div className="text-sm md:text-base flex items-center justify-between font-semibold p-2">
            <p className="text-xs md:text-sm">{`${entriesCount} ${
              entriesCount > 1 ? "entries" : "entry"
            }`}</p>
            <p>{formatNumber(total)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralTracker;
