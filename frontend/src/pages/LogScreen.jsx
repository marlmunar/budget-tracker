import React from "react";
import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";

const LogScreen = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold underline">Log Name</h2>
      <div className="grid grid-cols-[35%_65%] grid-rows-2 my-2">
        <AddEntryForm />
        <ExpenseList />
        <section id="expense-summary">
          <div className="section-title">
            <h2>Expense Summary</h2>
          </div>
          <ul>
            <div className="hidden">
              <li className="header-row summary">
                <span className="expense-name">Category</span>
                <span className="espense-amount">Total</span>
              </li>
            </div>
            <div id="summary">
              <div className="no-data">No Data</div>
            </div>
            <div className="hidden">
              <li className="per-category total">
                <span>Total amount spent</span>
                <span id="total"></span>
              </li>
            </div>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LogScreen;
