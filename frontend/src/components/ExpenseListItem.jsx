import { TbTrash, TbEdit } from "react-icons/tb";
const ExpenseListItem = ({
  expense,
  amount,
  category,
  timeStamps,
  bgColor = "#4CAF50",
  setIsEditing,
  setEntry,
}) => {
  return (
    <div className="my-2 bg-white shadow rounded px-4 p-2 grid grid-rows-2 grid-cols-2 items-center hover:bg-slate-200/50 transition-all duration-300 ">
      <div>
        <p className="text-lg font-semibold my-2">{expense}</p>
        <p className="text-xs">{timeStamps}</p>
      </div>
      <div className="flex items-center gap-2 min-h-12 col-span-2">
        <p className="min-w-32">PHP {amount}</p>
        <p
          className="max-w-[min-content] text-center rounded-xl overflow-hidden whitespace-nowrap px-2"
          style={{ backgroundColor: bgColor }}
        >
          {category}
        </p>
      </div>
      <div className="py-2 flex gap-2 justify-end row-start-1 col-start-2 self-start">
        <button
          className="log-tool-button"
          onClick={() => {
            setIsEditing(true);
            setEntry({
              expense,
              amount,
              category: { name: category, color: bgColor },
            });
          }}
        >
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
