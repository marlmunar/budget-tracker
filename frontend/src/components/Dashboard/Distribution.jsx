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
    if (allEntries.length < 1) return "var(--graph-bg)";
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
    <section className="bg-white p-2 flex flex-col w-full h-full max-h-[min-content] md:p-3 lg:p-4 rounded relative">
      <div className="flex justify-between">
        <h3 className="text-base md:text-lg font-semibold">
          Entries Distribution
        </h3>
        <button
          className="dashboard-button"
          onClick={() => setIsFiltering((prev) => !prev)}
        >
          {isFiltering ? <TbX /> : <TbDotsVertical />}
        </button>
      </div>

      {isFiltering && (
        <div
          className="text-xs md:text-sm 
          p-2 mx-2 md:mx-3 lg:mx-4
          absolute rounded 
          flex flex-col gap-1 
          top-9 right-0 md:top-10 lg:top-11 
          bg-gray-50 dark:bg-[#222222] 
          w-[calc(100%-0.9rem)] 
          md:w-[calc(100%-1.4rem)]
          lg:w-[calc(100%-1.9rem)]"
        >
          <h3 className="font-semibold text-sm md:text-base">Apply Filters</h3>
          <div className="flex flex-col lg:flex-row justify-between gap-1 *:w-full">
            <div
              className="max-h-8 flex justify-between gap-1 min-w-[10rem] lg:min-w-[8.5rem] p-1
             bg-slate-200 rounded dark:bg-[#474747]"
            >
              <p>Month:</p>
              <div className="bg-slate-100 max-w-45 lg:max-w-none w-full px-1 rounded relative dark:bg-[#313131]">
                <div
                  className="flex justify-between gap-1 *:pointer-events-none relative"
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
                      className="absolute top-5 md:top-6 right-0 w-full z-10
                      shadow shadow-slate-300 bg-white 
                      dark:bg-[#313131] dark:shadow-slate-950 dark:shadow-xs
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
            <div className="max-h-8 flex justify-between gap-1 lg:min-w-[16rem] p-1 bg-slate-200 rounded dark:bg-[#474747]">
              <p className="text-nowrap">Selected Logs:</p>
              <div className="bg-slate-100 max-w-45 lg:max-w-none w-full px-1 rounded relative dark:bg-[#313131]">
                <div
                  className="flex justify-between gap-1 *:pointer-events-none relative"
                  onClick={() => setIsSelectingLogs((prev) => !prev)}
                  data-id="filterLogs"
                >
                  <p className="max-w-[20ch] lg:max-w-[14ch] xl:max-w-[16ch] truncate">
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
                    onOutsideClick={() => {
                      setIsSelectingLogs(false);
                      setFilter(selectedLogs);
                    }}
                    id="filterLogs"
                  >
                    <menu
                      className="absolute top-5 md:top-6 right-0 w-full z-10
                      shadow shadow-slate-300 bg-white 
                      dark:bg-[#313131] dark:shadow-slate-950 dark:shadow-xs
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
                          <li>
                            <p className="max-w-[18ch] md:max-w-[16ch] lg:max-w-[12ch] xl:max-w-[16ch] truncate">
                              {log}
                            </p>
                          </li>
                        </div>
                      ))}

                      <div className="w-full flex gap-1">
                        <button
                          className="w-full text-center bg-gray-300 rounded
                          dark:bg-[#222222] dark:active:bg-gray-800
                          dark:hover:bg-gray-900 dark:hover:text-white"
                          onClick={() => {
                            setSelectedLogs(filter);
                            setIsSelectingLogs(false);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="w-full text-center bg-gray-300 rounded
                          dark:bg-[#222222] dark:active:bg-gray-800
                          dark:hover:bg-gray-900 dark:hover:text-white"
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

      <div className="h-full p-4 flex justify-center items-center">
        <div
          style={{ background: getBg() }}
          className="min-w-[12rem] min-h-[12rem] md:w-[20rem] md:h-[20rem] rounded-full flex justify-center items-center"
        >
          <div
            className="bg-white w-[10rem] h-[10rem] md:w-[16rem] md:h-[16rem] rounded-full 
            flex flex-col justify-center items-center
            dark:bg-[#2f2f2f]"
          >
            <span className="text-lg md:text-4xl">{month}</span>
            <div className="text-xs md:text-sm space-x-1 text-gray-800 dark:text-[#bababa]">
              <span>{getSelectedLogs()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distribution;
