const ExpenseSummaryItem = ({
  category,
  amount,
  setSelectedCategories,
  setDisplayReload,
}) => {
  return (
    <div
      className="p-1 flex md:flex-col justify-between
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
        className="text-base md:tetx-lg font-semibold  
        w-[45%] p-1 rounded"
      >
        {category.name}
      </p>
      <p className="text-right bg-white rounded w-full p-1">{amount}</p>
    </div>
  );
};

export default ExpenseSummaryItem;
