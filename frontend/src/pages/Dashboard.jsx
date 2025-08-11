import React, { useState } from "react";
import OutsideClick from "../components/OutsideClick";
import { Link } from "react-router-dom";
import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCheck,
  TbDotsVertical,
  TbSquare,
  TbSquareCheck,
  TbX,
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
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSelectingLogs, setIsSelectingLogs] = useState(false);
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
          <div className="bg-white p-2 h-full w-full rounded relative">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Entries Distribution</h3>
              <button
                className="log-tool-button bg-gray-200"
                onClick={() => setIsFiltering((prev) => !prev)}
              >
                {isFiltering ? <TbX /> : <TbDotsVertical />}
              </button>
            </div>

            {isFiltering && (
              <div className="absolute flex flex-col p-2 rounded top-10 right-2 bg-gray-50">
                <h3 className="font-semibold">Apply Filters</h3>
                <div className="flex justify-between gap-1">
                  <div className="max-h-8 flex gap-1 w-[11.5rem] p-1 bg-slate-200 rounded">
                    <p>Month:</p>
                    <div className="bg-slate-100 w-full px-1 rounded relative">
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
                  <div className="max-h-8 flex gap-1 w-[18rem] p-1 bg-slate-200 rounded">
                    <p className="text-nowrap">Selected Logs:</p>
                    <div className="bg-slate-100 w-full px-1 rounded relative">
                      <div
                        className="flex justify-between gap-1 *:pointer-events-none"
                        onClick={() => setIsSelectingLogs((prev) => !prev)}
                        data-id="filterLogs"
                      >
                        <p className="max-w-[14ch] truncate">
                          {getSelectedLogs()}
                        </p>
                        <button>
                          {isSelectingLogs ? (
                            <TbCaretUpFilled />
                          ) : (
                            <TbCaretDownFilled />
                          )}
                        </button>
                      </div>
                      {isSelectingLogs && (
                        <OutsideClick
                          onOutsideClick={() => setIsSelectingLogs(false)}
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
                                  setIsSelectingLogs(false);
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
              </div>
            )}

            <div className="h-full p-2 flex justify-center items-center">
              <div className="bg-[conic-gradient(#4caf50_0%_40%,#2196f3_40%_70%,#ff9800_70%_100%)] w-[20rem] h-[20rem] rounded-full flex justify-center items-center">
                <div className="bg-white w-[16rem] h-[16rem] rounded-full flex flex-col justify-center items-center">
                  <span className="text-4xl">{month}</span>
                  <div className="space-x-1 text-gray-800">
                    <span>2 Active Logs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-28 w-full rounded p-2">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="flex *:w-full gap-1">
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded bg-[#4caf50]"></div>
                <div className="flex flex-col">
                  <span>Category 1</span>
                  <div className="text-xs text-gray-500 space-x-1">
                    <span>33%</span>
                    <span>Category Type</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded bg-[#2196f3]"></div>
                <div className="flex flex-col">
                  <span>Category 2</span>
                  <div className="text-xs text-gray-500 space-x-1">
                    <span>33%</span>
                    <span>Category Type</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded bg-[#ff9800]"></div>
                <div className="flex flex-col">
                  <span>Category 3</span>
                  <div className="text-xs text-gray-500 space-x-1">
                    <span>33%</span>
                    <span>Category Type</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <div className="bg-white h-full w-full rounded p-2 flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Breakdown</h3>
            <div className="bg-gray-50 rounded p-2">
              <div>
                <p className="font-semibold">Total Spent</p>
                <p className="text-4xl text-right text-gray-800 pr-2">
                  PHP 0.00
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
                <p className="font-semibold">Total Saved</p>
                <p className="text-4xl text-right text-gray-800 pr-2">
                  PHP 0.00
                </p>
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
          </div>
          <div className="bg-white h-24 w-full rounded p-2 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">Your Bugdetarian Grade</h3>
            <p className="text-4xl self-end text-gray-800 pr-2">Grade</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
