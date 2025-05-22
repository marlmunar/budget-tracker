import React from "react";
import AddEntryForm from "../components/AddEntryForm";

const LogScreen = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold underline">Log Name</h2>
      <div className="grid grid-cols-[35%_65%] grid-rows-2 my-2">
        <AddEntryForm />
        <section id="expense-list">
          <div class="section-title">
            <h2>Expense List</h2>
            <div id="filterBox"></div>
            <div id="downloadBox"></div>
            <div class="hidden">
              <div class="section-buttons">
                <button title="Filter Table" id="filter">
                  <i class="fa-solid fa-list-check"></i>
                </button>
                <button title="Download Table" id="download">
                  <i class="fas fa-file-arrow-down"></i>
                </button>
              </div>
            </div>
          </div>
          <ul>
            <div class="hidden">
              <li class="header-row log">
                <span class="expense-name">Expense</span>
                <span class="espense-amount">Amount</span>
                <span class="expense-category">Category</span>
                <span class="">Options</span>
              </li>
            </div>
            <div id="update"></div>
            <div id="log">
              <div class="no-data">No Data</div>
            </div>
          </ul>
        </section>
        <section id="expense-summary">
          <div class="section-title">
            <h2>Expense Summary</h2>
          </div>
          <ul>
            <div class="hidden">
              <li class="header-row summary">
                <span class="expense-name">Category</span>
                <span class="espense-amount">Total</span>
              </li>
            </div>
            <div id="summary">
              <div class="no-data">No Data</div>
            </div>
            <div class="hidden">
              <li class="per-category total">
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
