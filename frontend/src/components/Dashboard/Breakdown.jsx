import React from "react";

const Breakdown = ({ distribution, totalData }) => {
  const formatNumber = (value) => {
    if (!value) return "PHP 0";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return `PHP ${trimmedDecimal ? formattedInt.trimmedDecimal : formattedInt}`;
  };

  return (
    <section className="bg-white h-full w-full rounded p-2 flex flex-col gap-1">
      <h3 className="text-lg font-semibold">Breakdown</h3>
      <div className="bg-gray-50 rounded p-2">
        <div>
          <p className="font-semibold">Total Spent</p>
          <p className="text-4xl text-right text-gray-800 pr-2">
            {formatNumber(totalData?.spent)}
          </p>
        </div>

        <div className="bg-gray-50 rounded p-1">
          <p className="text-sm">You spent most on these categories:</p>
          <div className="flex *:bg-slate-200 *:p-2 gap-2 *:w-full *:rounded">
            <div className="flex flex-col">
              <span>Category 1</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
            <div className="flex flex-col">
              <span>Category 2</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
            <div className="flex flex-col">
              <span>Category 3</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-2">
        <div>
          <p className="font-semibold">Total Earned</p>
          <p className="text-4xl text-right text-gray-800 pr-2">
            {formatNumber(totalData?.earned)}
          </p>
        </div>

        <div className="bg-gray-50 rounded p-1">
          <p className="text-sm">Top contributor of your income:</p>
          <div className="flex *:bg-slate-200 *:p-2 gap-2 *:w-full *:rounded">
            <div className="flex flex-col">
              <span>Category 1</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
            <div className="flex flex-col">
              <span>Category 2</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
            <div className="flex flex-col">
              <span>Category 3</span>
              <span className="text-sm">PHP 0.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-2">
        <p className="font-semibold">Total Entries</p>
        <p className="text-2xl text-right text-gray-800 pr-2">
          {`${totalData?.entries} ${
            totalData?.entries > 1 ? "entries" : "entry"
          }`}
        </p>
      </div>
    </section>
  );
};

export default Breakdown;
