import { useState } from "react";
import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import { TbDots } from "react-icons/tb";

const LogScreen = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  return (
    <main className="mx-auto md:max-w-[90%] lg:max-w-none">
      <title>Budgetarians' Log - Log Name</title>
      <div className="relative flex justify-between items-center">
        <h2 className="text-2xl font-semibold underline">Log Name</h2>
        <TbDots
          className=" border-2 w-15 rounded text-3xl cursor-pointer hover:bg-slate-300/50 hover:shadow-md hover:border-transparent transition-all duration-300"
          onClick={() => setIsSelecting((i) => !i)}
        />
        {isSelecting && (
          <div className="text-lg p-2 py-4 absolute shadow border-2 flex flex-col items-center gap-2 w-28 bg-white rounded right-0 top-10">
            <button className="underline">Rename</button>
            <button className="underline">Download</button>
            <button className="underline text-red-500">Delete</button>
          </div>
        )}
      </div>

      <div className="py-4 grid grid-cols-1 justify-between lg:grid-cols-[39%_59%] grid-rows-[min-content_min-content] my-2 gap-4">
        <AddEntryForm />
        <ExpenseList />
        <ExpenseSummary />
      </div>
    </main>
  );
};

export default LogScreen;
