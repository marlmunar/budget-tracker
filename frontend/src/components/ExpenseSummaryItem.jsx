const ExpenseSummaryItem = ({
  category,
  amount,
  setSelectedCategories,
  setDisplayReload,
}) => {
  return (
    <div
      className="p-1 flex flex-col justify-between bg-white shadow rounded 
      hover:shadow-slate-300 hover:translate-y-[-2px]
      active:scale-95
      transition-all duration-300"
      style={{ backgroundColor: category.color }}
      onClick={() => {
        setSelectedCategories([category.name]);
        setDisplayReload(true);
      }}
    >
      <p className="text-base md:tetx-lg font-semibold col-span-2 p-1 rounded">
        {category.name}
      </p>
      <p className="text-right bg-white rounded w-full p-1">{amount}</p>
    </div>
  );
};

export default ExpenseSummaryItem;
