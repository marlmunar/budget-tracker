const ExpenseCard = ({ name, amount, category }) => {
  return (
    <div className=" bg-white shadow rounded px-4 p-2 grid grid-cols-4 items-center hover:bg-slate-200/50 transition-all duration-300">
      <p className="font-semibold">{name}</p>
      <p>{amount}</p>
      <p>{category}</p>
      <div className="flex gap-2 justify-around">
        <button className="border-2 min-w-20 bg-white">Edit</button>
        <button className="border-2 min-w-20 bg-white">Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
