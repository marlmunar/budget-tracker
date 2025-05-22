import React from "react";
import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const LogScreen = () => {
  return (
    <main>
      <h2 className="text-2xl font-semibold underline">Log Name</h2>
      <div className="grid grid-cols-[35%_65%] grid-rows-2 my-2">
        <AddEntryForm />
        <ExpenseList />
        <ExpenseSummary />
      </div>
    </main>
  );
};

export default LogScreen;
