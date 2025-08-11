import React, { useState } from "react";
import OutsideClick from "../components/OutsideClick";
import { Link } from "react-router-dom";
import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";

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

const Dashboard = () => {
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);
  const [month, setMonth] = useState("");
  const [isSelectingDay, setIsSelectingDay] = useState(false);

  return (
    <>
      <title>Budgetarians' Log - Dashboard</title>
      <main className="h-full flex">
        <section className="w-full h-full border">
          <div className="flex gap-1 max-w-48 p-1 bg-gray-200 rounded">
            <p>Month:</p>
            <div className="bg-gray-400 w-full px-1 rounded relative">
              <div
                className="flex justify-between *:pointer-events-none"
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
                  <menu className="absolute top-6 right-0 w-full border space-y-1 px-1">
                    {months.map((month) => (
                      <li
                        key={month}
                        onClick={() => {
                          setMonth(month);
                          setIsSelectingMonth(false);
                        }}
                      >
                        {month}
                      </li>
                    ))}
                  </menu>
                </OutsideClick>
              )}
            </div>
          </div>
        </section>
        <section className="w-full h-full border"></section>
      </main>
    </>
  );
};

export default Dashboard;
