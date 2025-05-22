const ExpenseList = () => {
  return (
    <section className="log-section-container">
      <h2 className="log-section-header">Expense List</h2>

      <ul>
        {/* <div className="hidden">
          <li className="header-row log">
            <span className="expense-name">Expense</span>
            <span className="espense-amount">Amount</span>
            <span className="expense-category">Category</span>
            <span className="">Options</span>
          </li>
        </div> */}
        <div id="update"></div>
      </ul>
    </section>
  );
};

export default ExpenseList;
