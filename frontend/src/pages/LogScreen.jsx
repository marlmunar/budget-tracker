import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const LogScreen = () => {
  return (
    <main className="mx-auto md:max-w-[90%] lg:max-w-none">
      <title>Budgetarians' Log - Log Name</title>
      <h2 className="text-2xl font-semibold underline">Log Name</h2>
      <div className="py-4 grid grid-cols-1 justify-between lg:grid-cols-[39%_59%] grid-rows-2 my-2 gap-4">
        <AddEntryForm />
        <ExpenseList />
        <ExpenseSummary />
      </div>
    </main>
  );
};

export default LogScreen;
