import React from "react";
const grades = [
  { min: 90, max: 100, label: "Exceptional" },
  { min: 80, max: 89, label: "Outstanding" },
  { min: 70, max: 79, label: "Excellent" },
  { min: 60, max: 69, label: "Very Good" },
  { min: 50, max: 59, label: "Good" },
  { min: 15, max: 49, label: "Decent" },
  { min: 0, max: 14, label: "Poor" },
];

const Grade = ({ totalData }) => {
  const getGrade = (percentage) => {
    if (!percentage) return "No Data";
    const grade = grades.find(
      (g) => percentage >= g.min && percentage <= g.max
    );

    return grade.label;
  };

  return (
    <section className="bg-white h-24 w-full rounded p-4 flex flex-col justify-between">
      <h3 className="text-lg font-semibold">Your Bugdetarian Grade</h3>
      <p className="text-4xl self-end text-gray-800 pr-2">
        {getGrade(
          (totalData?.earned / (totalData?.spent + totalData?.earned)) * 100
        )}
      </p>
    </section>
  );
};

export default Grade;
