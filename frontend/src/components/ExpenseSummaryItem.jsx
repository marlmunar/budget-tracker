const ExpenseSummaryItem = ({
  category,
  amount,
  count,
  setSelectedCategories,
  setDisplayReload,
}) => {
  return (
    <div
      className="p-1 justify-between
      shadow rounded 
      hover:shadow-gray-400 
      hover:translate-y-[-2px]
      active:scale-95
      transition-all duration-300"
      style={{ backgroundColor: category.color }}
      onClick={() => {
        setSelectedCategories([category.name]);
        setDisplayReload(true);
      }}
    >
      <p
        className="text-xs md:text-sm font-semibold  
        w-[45%] p-1 rounded"
      >
        {category.name}
      </p>
      <div className="flex text-xs md:text-sm justify-between w-full bg-white rounded p-1">
        <p>{`${count} ${count > 1 ? "entries" : "entry"}`}</p>
        <p>{amount}</p>
      </div>
    </div>
  );
};

export default ExpenseSummaryItem;
