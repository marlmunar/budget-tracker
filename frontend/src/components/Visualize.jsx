import { useState } from "react";
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
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const present = new Date();
  const presentMonth = present.getMonth();
  const presentDate = present.getDate();

  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();
  const lastDayOfLastMonth = new Date(year, month, 0).getDay();
  console.log(lastDayOfLastMonth);
  console.log(lastDateOfLastMonth);

  const grids = [];
  let i = 0;
  let dayCount = 0;
  let lastDays = lastDayOfLastMonth;
  let fillerDays = 1;
  while (i < 42) {
    if (i === firstDay) {
      dayCount = 1;
    }

    if (i <= lastDayOfLastMonth && lastDayOfLastMonth < 6) {
      grids.push(
        <div key={i} className={`border rounded p-2 text-gray-500`}>
          {lastDateOfLastMonth - lastDays}
        </div>
      );
      console.log(i);
      console.log(lastDayOfLastMonth, lastDateOfLastMonth);
      lastDays--;
    } else if (dayCount > 0 && dayCount <= daysInMonth) {
      grids.push(
        <div
          key={i}
          className={
            presentMonth === month && presentDate === dayCount
              ? `rounded p-2 bg-blue-400 border-2`
              : `border rounded p-2 `
          }
        >
          {dayCount}
        </div>
      );
      dayCount++;
    } else {
      grids.push(
        <div key={i} className={`border rounded p-2 text-gray-500`}>
          {fillerDays}
        </div>
      );
      fillerDays++;
    }
    i++;
  }

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
    <div className="min-h-[100%] flex flex-col gap-1 rounded shadow-lg p-2 ">
      <div className="flex text-xl justify-between items-center h-12 shadow bg-slate-400 rounded p-2">
        <button
          className="bg-white rounded min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center"
          onClick={() => changeMonth("prev")}
        >
          {"< PREV"}
        </button>
        <div className="bg-white rounded min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center">
          {`${months[month].toUpperCase()} - ${year}`}
        </div>
        <button
          className="bg-white rounded min-w-[12rem] px-2 p-1 font-semibold flex justify-center items-center"
          onClick={() => changeMonth("next")}
        >
          {"NEXT >"}
        </button>
      </div>
      <div className="p-1 grow min-h-[100%] grid grid-cols-7 grid-rows-[3rem_repeat(6,minmax(5rem,1fr))] border-2 rounded gap-1">
        {days.map((day) => (
          <div
            key={day}
            className="p-2 border flex justify-center items-center font-semibold"
          >
            {day}
          </div>
        ))}
        {grids.map((grid) => grid)}
      </div>
    </div>
  );
};

export default Visualize;
