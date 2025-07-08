import { TbTrash, TbEdit } from "react-icons/tb";
import ExpenseListUIHandler from "./ExpenseListUIHandler";
const ExpenseListItem = ({
  expense,
  amount,
  category,
  timeStamps,
  bgColor = "#4CAF50",
  setEntry,
  setActiveUI,
}) => {
  const formatNumber = (value) => {
    if (!value) return "0";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return trimmedDecimal ? `${formattedInt}.${trimmedDecimal}` : formattedInt;
  };

  return (
    <div
      className="
      bg-white w-[98%] mx-auto shadow rounded pl-4 pr-2 pb-4 mb-1 
      grid grid-rows-[repeat(2, min-content)] grid-cols-2 
      transition-all duration-300
      hover:shadow-lg hover:shadow-slate-200 hover:mb-2
      "
    >
      <div className="mb-1 my-2">
        <p className="text-lg font-semibold my-1">PHP {formatNumber(amount)}</p>
        <p className="text-[0.7rem]">{timeStamps}</p>
      </div>
      <div className="flex items-start gap-2">
        <p className="min-w-32">{expense}</p>
        <p
          className="max-w-[min-content] text-center rounded overflow-hidden whitespace-nowrap px-2"
          style={{ backgroundColor: bgColor }}
        >
          {category}
        </p>
      </div>
      <div className="z-0 py-2 flex gap-1 justify-end row-start-1 col-start-2 self-start">
        <button
          className="entry-tool-button min-h-10 min-w-10 text-indigo-800"
          onClick={() => {
            setEntry({
              expense,
              amount,
              category: { name: category, color: bgColor },
            });
            setActiveUI("editEntry");
          }}
        >
          <TbEdit />
        </button>
        <button
          className="entry-tool-button min-h-10 min-w-10 text-red-800"
          onClick={() => {
            setEntry({
              expense,
              amount,
              category: { name: category, color: bgColor },
            });
            setActiveUI("deleteEntry");
          }}
        >
          <TbTrash />
        </button>
      </div>
    </div>
  );
};

export default ExpenseListItem;
