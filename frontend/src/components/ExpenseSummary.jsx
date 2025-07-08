import { TbReload } from "react-icons/tb";
import ExpenseSummaryItem from "./ExpenseSummaryItem";
import NoRecords from "./NoRecords";
import { useState } from "react";

const ExpenseSummary = ({ props }) => {
  const { categories, entries, selectedCategories, setSelectedCategories } =
    props;

  const [displayReload, setDisplayReload] = useState(false);

  const entriesCount = entries.reduce(
    (sum, entry) =>
      sum + (selectedCategories.includes(entry.category.name) ? 1 : 0),
    0
  );

  const sumPerCategory = categories
    .map((cat) => ({
      category: cat,
      amount: entries.reduce((acc, entry) => {
        return entry.category.name === cat.name ? acc + +entry.amount : acc;
      }, 0),
    }))
    .sort((a, b) => b.amount - a.amount);

  console.log(sumPerCategory);

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
              setSelectedCategories(categories.map((cat) => cat.name));
              setDisplayReload(false);
            }}
          >
            <TbReload />
          </button>
        )}
      </div>

      {entries.length > 0 ? (
        <div className="flex flex-col gap-2 p-2">
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
                setSelectedCategories={setSelectedCategories}
                setDisplayReload={setDisplayReload}
              />
            ) : (
              ""
            )
          )}
          <div className="rounded shadow">
            <div className="flex bg-slate-200 p-2 text-gray-800 justify-between font-semibold">
              <h3>Total</h3>
            </div>
            <div className="flex justify-between p-2">
              <p className="font-semibold">
                {`${entriesCount} ${entriesCount > 1 ? "entries" : "entry"}`}
              </p>
              <p>
                {formatNumber(
                  entries.reduce(
                    (sum, entry) =>
                      sum +
                      (selectedCategories.includes(entry.category.name)
                        ? +entry.amount
                        : 0),
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
