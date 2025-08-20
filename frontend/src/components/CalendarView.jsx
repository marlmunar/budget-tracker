import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetLogQuery } from "../slices/logsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { startLoading, stopLoading } from "../slices/appSlice";
import {
  TbArrowBackUp,
  TbArrowBigLeftFilled,
  TbArrowBigRightFilled,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";
import { motion } from "framer-motion";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

const CalendarView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getLog, { data }] = useLazyGetLogQuery();
  const { logId } = useParams();
  const [logData, setLogData] = useState({});
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [total, setTotal] = useState("");
  const [daysWithEntries, setDaysWithEntries] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [startX, setStartX] = useState(0);
  const [width, setWidth] = useState(0);
  const parentRef = useRef(null);
  const present = new Date();
  const presentMonth = present.getMonth();
  const presentDate = present.getDate();

  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();

  const calendarCells = Array(42)
    .fill(null)
    .map((_, i) => {
      if (i >= firstDay && i < firstDay + daysInMonth) {
        let value = i - firstDay + 1;
        if (
          presentMonth === month &&
          presentDate === value &&
          new Date().getFullYear() === year
        ) {
          return { type: "today", value };
        }
        return { type: "day", value };
      } else if (i < firstDay) {
        return {
          type: "filler",
          value: lastDateOfLastMonth - (firstDay - 1 - i),
        };
      } else {
        return { type: "filler", value: i - daysInMonth };
      }
    });

  const generateSummary = (list) => {
    const categories = [...new Set(list.map((entry) => entry.category.name))];
    const sumPerCategory = categories.map((cat) => ({
      category: list
        .map((cat) => cat.category)
        .find((entry) => entry.name === cat),
      total: list.reduce(
        (sum, entry) =>
          entry.category.name === cat ? +entry.amount + sum : sum,
        0
      ),
    }));
    const sumTotal = list.reduce((sum, entry) => entry.amount + sum, 0);

    setTotal(sumTotal);
    setSummary(sumPerCategory);
  };

  const checkDaysWithEntries = (data) => {
    const entriesThisMonth = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
    generateSummary(entriesThisMonth);
    const datesOfEntries = entriesThisMonth.map((entry) =>
      new Date(entry.date).getDate()
    );

    const uniqueDates = [...new Set(datesOfEntries)];
    setDaysWithEntries(uniqueDates);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLog(logId).unwrap();
        setLogData(res.data);
        setEntries(res.data.entries);
        checkDaysWithEntries(res.data.entries);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.status === 400 || error.status === 404) {
          navigate("/not-found");
        }
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [logId, getLog, dispatch]);

  useEffect(() => {
    if (!entries) {
      return;
    }
    checkDaysWithEntries(entries);
  }, [month]);

  useEffect(() => {
    const element = parentRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [month, summary]);

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
        setStartX(-30);
      }
    } else if (direction === "next") {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
        setStartX(30);
      }
    }
  };

  const { logPreferences } = useSelector((state) => state.user);

  const formatNumber = (value) => {
    const currency = logPreferences.currency;
    if (!value) return `${currency} 0.00`;

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return `${currency} ${
      trimmedDecimal ? formattedInt.trimmedDecimal : formattedInt
    }`;
  };

  return (
    <>
      <title>{`Budgetarians' Log ${
        logData.name ? `- ${logData.name}` : ""
      }`}</title>
      <motion.div
        data-motion
        key={month}
        initial={{ opacity: 0, x: startX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="log-section-container ml-auto shadow min-h-30 grow p-4 rounded mb-2">
          <h2 className="text-xl font-semibold">Summary</h2>
          {!!total ? (
            <div className="flex flex-col lg:flex-row justify-between gap-2 pt-2">
              <div className="w-full min-w-[min-content] flex flex-col gap-2 items-start justify-end">
                <h2 className="text-xl md:text-2xl font-semibold flex flex-col">
                  <span className="text-xs md:text-sm font-normal">
                    Monthly Total
                  </span>
                  <span>{formatNumber(total)}</span>
                </h2>
                <div
                  ref={parentRef}
                  className="h-4 rounded-xl overflow-hidden 
                  grid grid-rows-
                  grid-cols-[repeat(auto-fill,min-content)] 
                  grid-flow-col auto-cols-auto w-full max-w-150"
                >
                  {summary.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: entry.category.color,
                        width: (entry.total / total) * width,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="text-base w-full flex flex-col items-end">
                <h2 className="text-xs md:text-sm">Ranking</h2>
                {[...summary]
                  .sort((a, b) => b.total - a.total)
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mb-1 w-full max-w-52"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-sm shadow"
                          style={{ backgroundColor: entry.category.color }}
                        ></div>
                        <div>{entry.category.name}</div>
                      </div>

                      <div className="text-xs md:text-sm">{index + 1}</div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="text-base">No data for this month</div>
          )}
        </div>

        <div className="log-section-container min-h-[100%] flex flex-col gap-1 rounded shadow-lg p-2 ">
          <div
            className="flex text-xl justify-between items-center h-16 
          shadow bg-slate-600 dark:bg-[#3a3a3a] rounded p-2"
          >
            <button
              className="bg-white 
              dark:bg-[#272727]
              dark:text-[#ffffff]
              rounded text-2xl 
              text-gray-800
              p-2 font-semibold 
              flex justify-center items-center"
              onClick={() => changeMonth("prev")}
            >
              <TbChevronLeft />
            </button>
            <div className="bg-white dark:bg-[#272727] rounded lg:min-w-[12rem] p-2 font-semibold flex justify-center items-center">
              {`${months[month].toUpperCase()} - ${year}`}
            </div>
            <button
              className="bg-white 
              dark:bg-[#272727]
              dark:text-[#f2f2f2]
              rounded text-2xl 
              text-gray-800
              p-2 font-semibold 
              flex justify-center items-center"
              onClick={() => changeMonth("next")}
            >
              <TbChevronRight />
            </button>
          </div>
          {/* <div className="overflow-scroll p-1 grow min-h-[100%] grid grid-cols-[repeat(7, minmax(min-content,1fr))] grid-rows-[3rem_repeat(6,minmax(10rem,1fr))] border-2 rounded gap-1"> */}
          <div
            className="overflow-x-scroll border-2 
            border-gray-200  dark:border-[#272727] 
            rounded gap-1 p-1 dark:bg-[#161616] 
            lg:overflow-auto grid grid-cols-[repeat(7,minmax(min-content,1fr))] 
            w-full grid-rows-[3rem_repeat(6,minmax(10rem,1fr))] align-middle"
          >
            {days.map((day) => (
              <div
                key={day}
                className="p-2 min-w-[10rem] max-w-[10rem] 
                lg:max-w-none flex justify-center items-center font-semibold"
              >
                {day}
              </div>
            ))}
            {calendarCells.map((cell, i) => {
              let styles = "bg-gray-200 dark:bg-[#3a3a3a]";

              if (cell.type === "today") {
                styles = `border-2 border-amber-500 
                  bg-amber-100 dark:bg-slate-500
                  dark:border-slate-700 `;
              }

              if (cell.type === "filler") {
                styles =
                  "text-gray-400 opacity-100 bg-gray-100 dark:bg-[#272727]";
              }

              return (
                <div
                  key={i}
                  className={`${styles} rounded p-2 flex flex-col 
                  min-w-[10rem] max-w-[10rem] lg:max-w-none`}
                >
                  <div className="flex gap-2 rounded">
                    <span className="pl-1 font-semibold">{cell.value}</span>
                    {cell.type === "today" && <span>Today</span>}
                  </div>

                  {daysWithEntries.includes(cell.value) &&
                    cell.type !== "filler" && (
                      <div
                        className="bg-gray-100 dark:bg-[#3a3a3a]
                        rounded w-full h-full text-xs 
                        flex flex-col p-1 gap-1 border-2 
                        border-indigo-500/55 dark:border-[#272727]"
                      >
                        {entries.map((entry, index) =>
                          new Date(entry.date.split("T")[0]).getDate() ===
                            cell.value && cell.type !== "filler" ? (
                            <span
                              key={index}
                              className="px-2 rounded w-full truncate"
                              style={{ backgroundColor: entry.category.color }}
                            >
                              <span className="font-semibold dark:text-[#565656]">
                                {formatNumber(entry.amount)}
                              </span>
                            </span>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CalendarView;
