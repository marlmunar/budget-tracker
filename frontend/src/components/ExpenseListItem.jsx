import { TbTrash, TbEdit } from "react-icons/tb";
const ExpenseListItem = ({
  name,
  amount,
  category,
  timeStamps,
  bgColor = "#4CAF50",
}) => {
  return (
    <div className="my-2 bg-white shadow rounded px-4 p-2 grid grid-rows-2 grid-cols-3 items-center hover:bg-slate-200/50 transition-all duration-300">
      <div className="col-span-2">
        <p className="text-lg font-semibold my-1">{name}</p>
        <p className="text-xs">{timeStamps}</p>
      </div>
      <p>PHP {amount}</p>
      <p
        className="max-w-20 text-center rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        {category}
      </p>
      <div className="py-2 flex gap-2 justify-end row-start-1 col-start-3 row-span-2 self-start">
        <button className="log-tool-button">
          <TbEdit />
        </button>
        <button className="log-tool-button">
          <TbTrash />
        </button>
      </div>
    </div>
  );
};

export default ExpenseListItem;
