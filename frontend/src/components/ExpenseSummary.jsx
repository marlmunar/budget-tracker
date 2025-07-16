import { TbReload } from "react-icons/tb";
import ExpenseSummaryItem from "./ExpenseSummaryItem";
import NoRecords from "./NoRecords";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExpenseSummary = ({ props }) => {
  const { selectedCategories, setSelectedCategories } = props;
  const { tempCategories } = useSelector((state) => state.logs);
  const { tempEntries } = useSelector((state) => state.logs);

  const [displayReload, setDisplayReload] = useState(false);

  const entriesCount = tempEntries.reduce(
    (sum, entry) =>
      sum + (selectedCategories.includes(entry.category.name) ? 1 : 0),
    0
  );

  useEffect(() => {
    if (tempCategories.length === selectedCategories.length) {
      setDisplayReload(false);
    }
  }, [selectedCategories, tempCategories]);

  const totalIncome = tempEntries.reduce(
    (sum, entry) =>
      sum +
      (entry.category.type === "Income" &&
      selectedCategories.includes(entry.category.name)
        ? +entry.amount
        : 0),
    0
  );

  const totalExpense = tempEntries.reduce(
    (sum, entry) =>
      sum +
      (entry.category.type === "Expense" &&
      selectedCategories.includes(entry.category.name)
        ? +entry.amount
        : 0),
    0
  );

  const total = tempEntries.reduce(
    (sum, entry) =>
      sum +
      (selectedCategories.includes(entry.category.name) ? +entry.amount : 0),
    0
  );

  const sumPerCategory = tempCategories
    .map((cat) => ({
      category: cat,
      amount: tempEntries.reduce((acc, entry) => {
        return entry.category.name === cat.name ? acc + +entry.amount : acc;
      }, 0),
      count: tempEntries.reduce(
        (sum, entry) => sum + (cat.name === entry.category.name ? 1 : 0),
        0
      ),
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
        {displayReload && (
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={() => {
              setSelectedCategories(tempCategories.map((cat) => cat.name));
              setDisplayReload(false);
            }}
          >
            <TbReload />
          </button>
        )}
      </div>

      {tempEntries.length > 0 ? (
        <div className="flex text-xs md:text-sm flex-col gap-2 p-2">
          <div className="flex bg-slate-200 p-2 rounded text-gray-800 justify-between font-semibold">
            <h3>Category</h3>
            <h3>Subtotal</h3>
          </div>
          {sumPerCategory.map((item, index) =>
            item.amount > 0 &&
            selectedCategories.includes(item.category.name) ? (
              <ExpenseSummaryItem
                key={index}
                category={item.category}
                amount={formatNumber(item.amount)}
                count={item.count}
                setSelectedCategories={setSelectedCategories}
                setDisplayReload={setDisplayReload}
              />
            ) : (
              ""
            )
          )}
          {!displayReload && (
            <div className="rounded shadow bg-slate-200">
              <div className="flex text-base md:text-lg p-2 text-gray-800 justify-between font-semibold">
                <h3>Total</h3>
              </div>
              <div className="text-xs md:text-sm flex justify-between p-2 bg-white">
                <p>Income</p>
                <p>{formatNumber(totalIncome)}</p>
              </div>
              <div className="text-xs md:text-sm flex justify-between p-2 bg-white">
                <p>Expense</p>
                <p>{formatNumber(totalExpense)}</p>
              </div>
              <div className="text-sm md:text-base flex items-center justify-between font-semibold p-2">
                <p className="text-xs md:text-sm">{`${entriesCount} ${
                  entriesCount > 1 ? "tempEntries" : "entry"
                }`}</p>
                <p>{formatNumber(total)}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
