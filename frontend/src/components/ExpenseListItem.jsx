import { TbTrash, TbEdit } from "react-icons/tb";

const ExpenseListItem = ({
  expense,
  amount,
  category,
  timeStamps,
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
      bg-white w-[98%] mx-auto shadow rounded 
      pl-4 pr-2 pb-4 mb-1 
      grid grid-rows-[repeat(2,min-content)] grid-cols-2 
      transition-all duration-300
      hover:shadow-lg hover:shadow-slate-200 hover:mb-2
      "
    >
      <div className="mb-1 my-2">
        <p className="md:text-lg font-semibold my-1">
          PHP {formatNumber(amount)}
        </p>
        <p className="text-[0.625rem] md:text-[0.7rem]">{timeStamps}</p>
      </div>
      <div className="text-xs md:text-base flex items-start gap-2 col-span-2">
        <p className="max-w-50">{expense}</p>
        <p
          className="max-w-[min-content] text-center rounded overflow-hidden whitespace-nowrap px-2"
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </p>
      </div>
      <div className="z-0 py-2 flex gap-1 justify-end row-start-1 col-start-2 self-start">
        <button
          className="entry-tool-button min-h-8 min-w-8 text-indigo-800"
          onClick={() => {
            setEntry({
              expense,
              amount,
              category,
            });
            setActiveUI("editEntry");
          }}
        >
          <TbEdit />
        </button>
        <button
          className="entry-tool-button button min-h-8 min-w-8 text-red-800"
          onClick={() => {
            setEntry({
              expense,
              amount,
              category,
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
