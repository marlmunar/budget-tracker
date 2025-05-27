import { TbTrash, TbEdit } from "react-icons/tb";
const ExpenseListItem = ({ name, amount, category }) => {
  return (
    <div className="my-2 bg-white shadow rounded px-4 p-2 grid grid-rows-2 grid-cols-3 items-center hover:bg-slate-200/50 transition-all duration-300">
      <p className="text-lg font-semibold col-span-2">{name}</p>
      <p>{amount}</p>
      <p>{category}</p>
      <div className="flex gap-2 justify-end row-start-1 col-start-3 row-span-2">
        <TbEdit className="rounded text-3xl p-1 border-2 md:min-w-10 bg-white" />
        <TbTrash className="rounded text-3xl p-1 border-2 md:min-w-10 bg-white" />
      </div>
    </div>
  );
};

export default ExpenseListItem;
