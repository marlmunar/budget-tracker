import React, { useState } from "react";
import OutsideClick from "../components/OutsideClick";
import { Link } from "react-router-dom";
import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCheck,
  TbSquare,
  TbSquareCheck,
} from "react-icons/tb";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const logs = [
  "abcdefghijklmnopqrstuvwxy",
  "tracker 2",
  "tracker 3",
  "tracker 4",
  "tracker 5",
  "tracker 6",
  "tracker 7",
  "tracker 8",
];

const Dashboard = () => {
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);
  const [month, setMonth] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  const getSelectedLogs = () => {
    if (logs.length === selectedLogs.length) return "All active logs";
    const count = selectedLogs.length;
    if (count < 1) return "No logs selected";
    if (count === 1) return selectedLogs[0];
    return `${count} active logs`;
  };

  const handleClick = (value) => {
    if (filter.includes(value))
      return setFilter(filter.filter((log) => log !== value));
    setFilter([...filter, value]);
  };

  return (
    <>
      <title>Budgetarians' Log - Dashboard</title>
      <main className="h-full flex gap-2">
        <section
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <div className="flex justify-between p-2 shadow rounded bg-white">
            <div className="max-h-8 flex gap-1 w-[11.5rem] p-1 bg-slate-100 rounded">
              <p>Month:</p>
              <div className="bg-slate-300 w-full px-1 rounded relative">
                <div
                  className="flex justify-between gap-1 *:pointer-events-none"
                  onClick={() => setIsSelectingMonth((prev) => !prev)}
                  data-id="selectMonth"
                >
                  <p>{month ? month : "Select Month"}</p>
                  <button>
                    {isSelectingMonth ? (
                      <TbCaretUpFilled />
                    ) : (
                      <TbCaretDownFilled />
                    )}
                  </button>
                </div>
                {isSelectingMonth && (
                  <OutsideClick
                    onOutsideClick={() => setIsSelectingMonth(false)}
                    id="selectMonth"
                  >
                    <menu
                      className="absolute top-7 right-0 w-full 
                  shadow shadow-slate-300 bg-white 
                  space-y-1 p-1 rounded"
                    >
                      {months.map((mon) => (
                        <li
                          key={mon}
                          onClick={() => {
                            setMonth(mon);
                            setIsSelectingMonth(false);
                          }}
                        >
                          {mon}
                        </li>
                      ))}
                    </menu>
                  </OutsideClick>
                )}
              </div>
            </div>
            <div className="max-h-8 flex gap-1 w-[18rem] p-1 bg-slate-100 rounded">
              <p className="text-nowrap">Selected Logs:</p>
              <div className="bg-slate-300 w-full px-1 rounded relative">
                <div
                  className="flex justify-between gap-1 *:pointer-events-none"
                  onClick={() => setIsFiltering((prev) => !prev)}
                  data-id="filterLogs"
                >
                  <p className="max-w-[14ch] truncate">{getSelectedLogs()}</p>
                  <button>
                    {isSelectingMonth ? (
                      <TbCaretUpFilled />
                    ) : (
                      <TbCaretDownFilled />
                    )}
                  </button>
                </div>
                {isFiltering && (
                  <OutsideClick
                    onOutsideClick={() => setIsFiltering(false)}
                    id="filterLogs"
                  >
                    <menu
                      className="absolute top-7 right-0 w-full 
                  shadow shadow-slate-300 bg-white 
                  space-y-1 p-1 rounded"
                    >
                      {logs.map((log, index) => (
                        <div
                          className="flex justify-between items-center gap-1"
                          key={index}
                        >
                          <div
                            className="text-xl"
                            onClick={() => handleClick(log)}
                          >
                            {filter.includes(log) ? (
                              <TbSquareCheck className="text-blue-800 dark:text-[#f0f0f0]" />
                            ) : (
                              <TbSquare className="text-slate-300" />
                            )}
                          </div>
                          <li className="truncate">{log}</li>
                        </div>
                      ))}
                      <div className="w-full flex gap-1">
                        <button
                          className="w-full text-center bg-gray-300 rounded"
                          onClick={() => {
                            setSelectedLogs(filter);
                            setIsFiltering(false);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="w-full text-center bg-gray-300 rounded"
                          onClick={() => setFilter([])}
                        >
                          Clear
                        </button>
                      </div>
                    </menu>
                  </OutsideClick>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 h-full w-full rounded flex justify-center items-center">
            <div className="bg-[conic-gradient(#4caf50_0%_40%,#2196f3_40%_70%,#ff9800_70%_100%)] w-[20rem] h-[20rem] rounded-full flex justify-center items-center">
              <div className="bg-white w-[16rem] h-[16rem] rounded-full"></div>
            </div>
          </div>
          <div className="bg-white h-24 w-full rounded p-2 grid grid-rows-2 grid-cols-4">
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded bg-[#4caf50]"></div>
              <span>Category 1</span>
              <span className="text-sm text-gray-500">33%</span>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded bg-[#2196f3]"></div>
              <span>Category 2</span>
              <span className="text-sm text-gray-500">33%</span>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded bg-[#ff9800]"></div>
              <span>Category 3</span>
              <span className="text-sm text-gray-500">33%</span>
            </div>
          </div>
        </section>
        <section
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <div className="bg-white h-full w-full rounded p-2 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Breakdown</h3>
            <div className="bg-gray-100 rounded p-2">
              <div>
                <p className="font-semibold">Total Spent</p>
                <p className="text-4xl text-right text-gray-800">PHP 0.00</p>
              </div>

              <div className="bg-gray-100 rounded p-1">
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

            <div className="bg-gray-100 rounded p-2">
              <div>
                <p className="font-semibold">Total Saved</p>
                <p className="text-4xl text-right text-gray-800">PHP 0.00</p>
              </div>

              <div className="bg-gray-100 rounded p-1">
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

            <div className="bg-gray-100 rounded p-2">
              <p className="font-semibold">Total Entries</p>
              <p className="text-2xl text-right text-gray-800">0 entry</p>
            </div>
          </div>
          <div className="bg-white h-24 w-full rounded p-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Your Bugdetarian Grade</h3>
            <p className="text-4xl self-end text-gray-800">Grade</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
