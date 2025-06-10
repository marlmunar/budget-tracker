import { useEffect, useState } from "react";
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
  const [daysWithEntries, setDaysWithEntries] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
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

  const checkDaysWithEntries = (data) => {
    const entriesThisMonth = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
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
        console.log(res.data);
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
      <div className="flex mb-2 gap-2 text-3xl items-center">
        <Link className="log-button" to={`/log/${logId}`}>
          <TbArrowBackUp />
        </Link>

        <h2 className="text-2xl font-semibold underline">{logData.name}</h2>
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
