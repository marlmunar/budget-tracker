import React, { useState } from "react";
import Distribution from "../components/Dashboard/Distribution";
import Categories from "../components/Dashboard/Categories";
import Breakdown from "../components/Dashboard/Breakdown";
import Grade from "../components/Dashboard/Grade";

const Dashboard = () => {
  return (
    <>
      <title>Budgetarians' Log - Dashboard</title>
      <main className="h-full flex gap-2">
        <div
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <Distribution />
          <Categories />
        </div>
        <div
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <Breakdown />
          <Grade />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
