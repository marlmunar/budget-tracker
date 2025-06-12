import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetLogQuery } from "../slices/logsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { startLoading, stopLoading } from "../slices/appSlice";
import { TbArrowBackUp } from "react-icons/tb";
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

const Visualize = () => {
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
        if (presentMonth === month && presentDate === value) {
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
        if (error.status == 400) {
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
      }
    } else if (direction === "next") {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      <title>{`Budgetarians' Log ${
        logData.name ? `- ${logData.name}` : ""
      }`}</title>
      <div className="lg:flex mb-2 gap-2 text-3xl justify-start w-full">
        <div className="flex items-center max-h-[min-content]">
          <Link className="log-button" to={`/log/${logId}`}>
            <TbArrowBackUp />
          </Link>

          <h2 className="text-2xl font-semibold underline">{logData.name}</h2>
        </div>

        <div className="ml-auto shadow min-h-30 lg:max-w-[65%] grow p-4 rounded mb-2">
          <h2 className="text-xl font-semibold">Summary</h2>
          {!!total ? (
            <div className="flex flex-col lg:flex-row">
              <div className="text-sm">
                <h2 className="text-base font-semibold">Ranking</h2>
                {[...summary]
                  .sort((a, b) => b.total - a.total)
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mb-1 w-36"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-xl shadow"
                          style={{ backgroundColor: entry.category.color }}
                        ></div>
                        <div>{entry.category.name}</div>
                      </div>

                      <div>{index + 1}</div>
                    </div>
                  ))}
              </div>
              <div className="ml-auto min-w-[75%] flex flex-col justify-end items-end mb-2">
                <h2 className="text-2xl font-semibold mb-2">{`Total: ${total}`}</h2>
                <div
                  ref={parentRef}
                  className="ml-auto h-5 rounded-xl overflow-hidden grid grid-rows-1 grid-cols-[repeat(auto-fill,min-content)] grid-flow-col auto-cols-auto w-full max-w-150"
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
            </div>
          ) : (
            <div className="text-base">No data for this month</div>
          )}
        </div>
      </div>

      <div className="border-2 min-h-[100%] flex flex-col gap-1 rounded shadow-lg p-2 ">
        <div className="flex text-xl justify-between items-center h-12 shadow bg-slate-400 rounded p-2">
          <button
            className="bg-white rounded lg:min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center"
            onClick={() => changeMonth("prev")}
          >
            {"< PREV"}
          </button>
          <div className="bg-white rounded lg:min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center">
            {`${months[month].toUpperCase()} - ${year}`}
          </div>
          <button
            className="bg-white rounded lg:min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center"
            onClick={() => changeMonth("next")}
          >
            {"NEXT >"}
          </button>
        </div>
        <div className="p-1 grow min-h-[100%] grid grid-cols-7 grid-rows-[3rem_repeat(6,minmax(10rem,1fr))] border-2 rounded gap-1">
          {days.map((day) => (
            <div
              key={day}
              className="truncate p-2 border flex justify-center items-center font-semibold"
            >
              {day}
            </div>
          ))}
          {calendarCells.map((cell, i) => {
            let styles = "border";

            if (cell.type === "today") {
              styles = "border-5 border-amber-500";
            }

            if (cell.type === "filler") {
              styles = "text-gray-200 opacity-95";
            }

            return (
              <div
                key={i}
                className={`${styles} rounded p-2 flex flex-col lg:grid grid-cols-[11%_88%] items-start`}
              >
                <span>{cell.value}</span>

                {daysWithEntries.includes(cell.value) && (
                  <div className="bg-white rounded w-full h-full text-xs flex flex-col p-1 gap-1">
                    {entries.map((entry, index) =>
                      new Date(entry.date.split("T")[0]).getDate() ===
                        cell.value && cell.type !== "filler" ? (
                        <span
                          key={index}
                          className="px-2 rounded w-full truncate"
                          style={{ backgroundColor: entry.category.color }}
                        >
                          <span className="font-semibold">{entry.amount}</span>
                          <span>
                            {" - "}
                            {entry.category.name}
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
    </>
  );
};

export default Visualize;
