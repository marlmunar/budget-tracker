import { useSelector } from "react-redux";
import ExpenseSummaryItem from "../ExpenseSummaryItem";
import { useEffect, useState } from "react";

const BugdetTracker = ({ props }) => {
  const {
    filteredList,
    formatNumber,
    displayReload,
    setDisplayReload,
    setSelectedCategories,
    logData,
  } = props;

  const { tempCategories } = useSelector((state) => state.logs);
  const [progress, setProgress] = useState(0);
  const [percentageData, setPercentageData] = useState(0);

  const getDaysToGo = () => {
    const start = new Date(logData.startDate);
    const end = new Date(logData.endDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let days;

    if (today <= start) {
      // Show total days in range
      days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    } else if (today <= end) {
      // Show remaining days from today to endDate
      days = Math.round((end - today) / (1000 * 60 * 60 * 24)) + 1;
    } else {
      // End date has passed
      days = 0;
    }

    return `${days} day${days !== 1 ? "s" : ""}`;
  };

  function formatDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/\s/, " ");
  }

  const entriesCount = filteredList.reduce((sum, entry) => sum + 1, 0);

  const total = filteredList.reduce((sum, entry) => sum + +entry.amount, 0);

  useEffect(() => {
    const percentage = total / logData.threshold;
    if (percentage >= 1) {
      setProgress("100%");
      setPercentageData("100%");
      return;
    }

    const percentageString = `${Math.round(percentage * 100)}%`;
    setProgress(percentageString);
    setPercentageData(percentageString);
  }, [filteredList]);

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
      <div className="flex bg-slate-200 p-2 rounded text-gray-800 justify-between font-semibold">
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
        <>
          <div className="rounded shadow bg-slate-200">
            <div className="flex p-2 text-gray-800 justify-between font-semibold">
              <h3>Consumption</h3>
            </div>
            <div className="bg-white flex flex-col items-center justify-between p-2">
              <div className="flex justify-between items-center w-full">
                <p className="text-[0.6rem] md:text-[0.8rem] text-gray-800">{`${formatNumber(
                  total
                )} / ${formatNumber(logData.threshold)}`}</p>
                <p className="text-xs md:text-sm font-semibold">
                  {percentageData}
                </p>
              </div>
              <div className="w-full border-2 border-gray-500 rounded-full flex overflow-hidden">
                <div
                  className={`${
                    progress === "100%" ? "bg-red-500" : "bg-green-500"
                  } min-h-4 rounded-full`}
                  style={{ width: progress }}
                ></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="rounded shadow bg-slate-200">
            <div className="flex p-2 text-gray-800 justify-between font-semibold">
              <h3>Total</h3>
            </div>
            <div className="bg-white text-xs md:text-sm flex items-center justify-between font-semibold p-2">
              <p>{`${entriesCount} ${
                entriesCount > 1 ? "entries" : "entry"
              }`}</p>
              <p>{formatNumber(total)}</p>
            </div>
          </div>
          <div className="rounded shadow bg-slate-200">
            <div className="flex p-2 text-gray-800 justify-between ">
              <h3 className="font-semibold">Budget</h3>
            </div>
            <div className="bg-white text-xs md:text-sm flex flex-col p-2">
              <div className="flex justify-between">
                <p>Amount</p>
                <p className="font-semibold">
                  {formatNumber(logData.threshold)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Duration</p>
                <p className="font-semibold">
                  {`${formatDate(new Date(logData.startDate))} to 
                  ${formatDate(new Date(logData.endDate))}`}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Days To Go</p>
                <p className="font-semibold">{getDaysToGo()}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BugdetTracker;
