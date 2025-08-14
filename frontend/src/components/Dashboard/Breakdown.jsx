import React from "react";

const Breakdown = ({ distribution, totalData }) => {
  const formatNumber = (value) => {
    if (!value) return "PHP 0.00";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return `PHP ${trimmedDecimal ? formattedInt.trimmedDecimal : formattedInt}`;
  };

  const getTopExpenses = () => {
    const topExpenses = distribution
      .filter((entry) => entry.category.type === "Expense")
      .sort((a, b) => {
        b.total - a.total;
      })
      .slice(0, 4)
      .map((entry) => ({
        ...entry,
        percentage: `${
          Math.floor((entry.total / totalData.spent) * 100 * 100) / 100
        }%`,
      }));

    return topExpenses.filter((entry) => +entry.percentage.slice(0, -1) > 0);
  };

  const getTopIncomes = () => {
    const topIncomes = distribution
      .filter((entry) => entry.category.type === "Income")
      .sort((a, b) => {
        b.total - a.total;
      })
      .slice(0, 4)
      .map((entry) => ({
        ...entry,
        percentage: `${
          Math.floor((entry.total / totalData.earned) * 100 * 100) / 100
        }%`,
      }));

    return topIncomes.filter((entry) => +entry.percentage.slice(0, -1) > 0);
  };

  const getFillers = (count) => {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-[#272727] flex gap-1 items-center"
          >
            <div className="flex-col flex-1 rounded p-[0.15rem] px-1"></div>
            <div
              className="bg-gray-100 dark:bg-[#2d2d2d]
                   h-full w-full max-w-10 md:max-w-12 
                  lg:max-w-15 xl:max-w-20 p-1 lg:p-2 rounded 
                  flex justify-center"
            ></div>
          </div>
        ))}
      </>
    );
  };

  return (
    <section className="bg-white text-sm lg:text-base h-[min-content] w-full rounded p-2 md:p-3 lg:p-4 flex flex-col gap-1">
      <h3 className="text-base md:text-lg font-semibold">Breakdown</h3>
      <div className=" flex justify-between rounded space-y-1 *:p-1">
        <div className="mr-2 text-left">
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 dark:text-[#f3f3f3]">
            {formatNumber(totalData?.spent)}
          </p>
          <p>Total Spent</p>
        </div>
        <div className="mr-2 text-right">
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 dark:text-[#f3f3f3]">
            {formatNumber(totalData?.earned)}
          </p>
          <p>Total Earned</p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between rounded *:p-1">
        <div className="p-1 w-full space-y-1">
          <p className="text-[0.65rem] md:text-xs xl:text-sm">
            You spent most on these categories:
          </p>
          <div className="grid bsm:grid-cols-2 md:grid-cols-1 lg:grid-rows-4 lg:grid-cols-1 gap-1 *:min-h-[3rem] *:lg:min-h-[3.45rem] *:p-1 *:w-full *:rounded">
            {getTopExpenses().map((entry, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-[#222222] flex gap-1 items-center"
              >
                <div className="bg-white dark:bg-[#3a3a3a] h-full flex flex-col flex-1 justify-center rounded px-1">
                  <div className="flex items-center gap-1">
                    <div
                      style={{ background: entry.category.color }}
                      className="h-4 w-4 rounded"
                    ></div>
                    <span className="text-[0.65rem] md:text-xs xl:text-sm font-semibold">
                      {entry.category.name}
                    </span>
                  </div>
                  <span className="text-[0.55rem] md:text-[0.65rem] xl:text-xs text-gray-500 dark:text-[#bfbfbfbf]">
                    {formatNumber(entry.total)}
                  </span>
                </div>
                <div
                  className="bg-gray-50 dark:bg-[#323232] 
                  h-full w-full max-w-10 md:max-w-12 
                  lg:max-w-15 xl:max-w-20 p-1 lg:p-2 rounded 
                  flex justify-center items-center"
                >
                  <span className="text-[0.65rem] md:text-xs lg:text-sm xl:text-base">
                    {entry.percentage}
                  </span>
                </div>
              </div>
            ))}
            {getFillers(4 - getTopExpenses().length)}
          </div>
        </div>

        <div className="p-1 w-full space-y-1">
          <p className="text-[0.65rem] md:text-xs xl:text-sm">
            Top contributors of your earnings:
          </p>
          <div className="grid bsm:grid-cols-2 md:grid-cols-1 lg:grid-rows-4 lg:grid-cols-1 gap-1 *:min-h-[3rem] *:lg:min-h-[3.45rem] *:p-1 *:w-full *:rounded">
            {getTopIncomes().map((entry, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-[#222222] flex gap-1 items-center"
              >
                <div className="bg-white dark:bg-[#3a3a3a] h-full flex flex-col flex-1 justify-center rounded px-1">
                  <div className="flex items-center gap-1">
                    <div
                      style={{ background: entry.category.color }}
                      className="h-4 w-4 rounded"
                    ></div>
                    <span className="text-[0.65rem] md:text-xs xl:text-sm font-semibold">
                      {entry.category.name}
                    </span>
                  </div>
                  <span className="text-[0.55rem] md:text-[0.65rem] xl:text-xs text-gray-500 dark:text-[#bfbfbfbf]">
                    {formatNumber(entry.total)}
                  </span>
                </div>
                <div
                  className="bg-gray-50 dark:bg-[#323232] 
                  h-full w-full max-w-10 md:max-w-12 
                  lg:max-w-15 xl:max-w-20 p-1 lg:p-2 rounded 
                  flex justify-center items-center"
                >
                  <span className="text-[0.65rem] md:text-xs lg:text-sm xl:text-base">
                    {entry.percentage}
                  </span>
                </div>
              </div>
            ))}
            {getFillers(4 - getTopIncomes().length)}
          </div>
        </div>
      </div>

      <div className="mr-2 text-right">
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 dark:text-[#f3f3f3]">
          {`${totalData?.entries} ${
            totalData?.entries > 1 ? "entries" : "entry"
          }`}
        </p>
        <p>Total Entries</p>
      </div>
    </section>
  );
};

export default Breakdown;
