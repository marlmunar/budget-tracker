const AddEntryForm = () => {
  return (
    <section className="shadow rounded p-4 bg-gray-100 row-span-2">
      <h3 className="log-section-header">Log an Entry</h3>
      <form>
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="expense">Expense</label>
            <input
              id="expense"
              type="text"
              name="expense"
              placeholder="Food"
              autoComplete="off"
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="100"
              autoComplete="off"
              min="1"
              max="1000000"
              step="0.01"
              required
            />
          </div>
          <div className="input-column">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Needs"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="button-row">
          <button type="submit">Save Entry</button>
          <button type="reset">Clear Values</button>
        </div>
      </form>
    </section>
  );
};

export default AddEntryForm;
