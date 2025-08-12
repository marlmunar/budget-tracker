import React, { useEffect, useState } from "react";
import OutsideClick from "../OutsideClick";
import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbDotsVertical,
  TbListCheck,
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

const Distribution = ({
  data,
  distribution,
  setDistribution,
  setTotalData,
}) => {
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSelectingLogs, setIsSelectingLogs] = useState(false);
  const [filter, setFilter] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    const entries = data
      .filter((log) => selectedLogs.includes(log.name))
      .reduce((acc, log) => acc.concat(log.entries), [])
      .filter(
        (entry) =>
          new Date(entry.date).toLocaleString("en-US", { month: "long" }) ===
          month
      );
    setAllEntries(entries);
  }, [month, selectedLogs]);

  useEffect(() => {
    getDistribution();
    getTotalData();
  }, [allEntries]);

  useEffect(() => {
    const logNames = data.map((log) => log.name);
    setLogs(logNames);
    setFilter(logNames);
    setSelectedLogs(logNames);
  }, [data]);

  const getSelectedLogs = () => {
    if (logs.length === selectedLogs.length) return "All active logs";
    const count = selectedLogs.length;
    if (count < 1) return "No logs selected";
    if (count === 1) return selectedLogs[0];
    return `${count} active logs`;
  };

  const isEqual = (ref, value) => {
    return (
      ref.name === value.name &&
      ref.color === value.color &&
      ref.type === value.type
    );
  };

  const getBg = () => {
    if (allEntries.length < 1) return "#f0f0f0";
    let cumulative = 0;
    const stops = distribution
      .map((item) => {
        const start = cumulative;
        const end = cumulative + item.percent;
        cumulative = end;
        return `${item.category.color} ${start}% ${end}%`;
      })
      .join(",");

    const bg = `conic-gradient(${stops})`;
    return bg;
  };

  const getDistribution = () => {
    const total = allEntries.reduce((sum, entry) => sum + +entry.amount, 0);
    const categories = allEntries
      .map((entry) => entry.category)
      .filter(
        (value, index, self) =>
          index === self.findIndex((obj) => isEqual(obj, value))
      );

    const sumPerCategory = categories.map((cat) => ({
      category: cat,
      total: allEntries
        .filter((entry) => isEqual(cat, entry.category))
        .reduce((sum, entry) => sum + +entry.amount, 0),
    }));

    const data = sumPerCategory.map((entry) => ({
      category: entry.category,
      total: entry.total,
      percent: Math.round((entry.total / total) * 100 * 100) / 100,
    }));
    setDistribution(data);
  };

  const handleClick = (value) => {
    if (filter.includes(value))
      return setFilter(filter.filter((log) => log !== value));
    setFilter([...filter, value]);
  };

  const getTotalData = () => {
    const spent = allEntries
      .filter((entry) => entry.category.type === "Expense")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const earned = allEntries
      .filter((entry) => entry.category.type === "Income")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const entries = allEntries.length;

    setTotalData({ spent, earned, entries });
  };

  return (
    <section className="bg-white p-4 h-full w-full rounded relative">
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
        <div className="absolute flex flex-col p-2 rounded top-12 right-4 bg-gray-50">
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
                  <p className="max-w-[14ch] truncate">{getSelectedLogs()}</p>
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
                    onOutsideClick={() => {
                      setIsSelectingLogs(false);
                      setFilter(selectedLogs);
                    }}
                    id="filterLogs"
                  >
                    <menu
                      className="absolute top-7 right-0 w-full 
                  shadow shadow-slate-300 bg-white 
                  space-y-1 p-1 rounded"
                    >
                      <div
                        className="flex justify-between items-center gap-1"
                        onClick={() => setFilter(logs)}
                      >
                        <div className="text-xl">
                          <TbListCheck className="text-blue-800 dark:text-[#f0f0f0]" />
                        </div>
                        <li>Select All</li>
                      </div>
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
        <div
          style={{ background: getBg() }}
          className="w-[20rem] h-[20rem] rounded-full flex justify-center items-center"
        >
          <div className="bg-white w-[16rem] h-[16rem] rounded-full flex flex-col justify-center items-center">
            <span className="text-4xl">{month}</span>
            <div className="space-x-1 text-gray-800">
              <span>{getSelectedLogs()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distribution;
