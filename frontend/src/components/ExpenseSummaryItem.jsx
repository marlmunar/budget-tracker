const ExpenseSummaryItem = ({ category, amount }) => {
  return (
    <div className="my-2 p-2 px-4 flex justify-between bg-white shadow rounded hover:bg-slate-200/50 transition-all duration-300">
      <p className="text-base md:tetx-lg font-semibold col-span-2">
        {category}
      </p>
      <p>{amount}</p>
    </div>
  );
};

export default ExpenseSummaryItem;
