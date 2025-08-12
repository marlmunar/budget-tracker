import React from "react";

const Breakdown = () => {
  return (
    <section className="bg-white h-full w-full rounded p-2 flex flex-col gap-1">
      <h3 className="text-lg font-semibold">Breakdown</h3>
      <div className="bg-gray-50 rounded p-2">
        <div>
          <p className="font-semibold">Total Spent</p>
          <p className="text-4xl text-right text-gray-800 pr-2">PHP 0.00</p>
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
          <p className="font-semibold">Total Saved</p>
          <p className="text-4xl text-right text-gray-800 pr-2">PHP 0.00</p>
        </div>

        <div className="bg-gray-50 rounded p-1">
          <p className="text-sm">Top contributor of your savings:</p>
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
        <p className="text-2xl text-right text-gray-800 pr-2">0 entry</p>
      </div>
    </section>
  );
};

export default Breakdown;
