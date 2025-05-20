const UserProfile = () => {
  return (
    <section className="flex flex-col gap-2 items-start shadow rounded p-4 mt-4">
      <h2 className="text-2xl font-semibold">User Name</h2>
      <button>Edit name</button>
      <button>Profile settings</button>

      <div className="grid grid-row-4 grid-cols-2 gap-x-5 gap-y-1">
        <span className="font-semibold">Logs:</span>
        <span> 2</span>
        <span className="font-semibold">Monthly Income:</span>
        <span> 23,000</span>
        <span className="font-semibold">Monthly Expense:</span>
        <span> 21,892</span>
        <span className="font-semibold">Budgetarian Grade:</span>
        <span> Good</span>
      </div>
    </section>
  );
};

export default UserProfile;
