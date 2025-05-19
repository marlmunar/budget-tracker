import HomeCard from "./HomeCard";

const Instructions = () => {
  return (
    <HomeCard title={"How to use this log?"}>
      <div className="px-4 max-w-[65ch] text-lg">
        <h3 className="item-title">1. Be a Budgetarian</h3>
        <p className="pl-2 mb-5">
          Sign up and join our growing budgetarian community.
        </p>

        <h3 className="item-title">2. Create a Tracker</h3>
        <p className="pl-2 mb-5">
          Open the workspace and click "Add New Log" to create a tracker. You
          can name it and later rename or delete it as needed.
        </p>

        <h3 className="item-title">3. Log and Categorize</h3>
        <p className="pl-2 mb-5">
          Record your finances and assign them to categories. Customize each
          category with colors to make them easy to identify. Use filters and
          search tools for quick navigation.
        </p>

        <h3 className="item-title">4. Save Your Logs</h3>
        <p className="pl-2 mb-5">
          Click the download button to save a copy of your log. This will
          generate a spreadsheet version, including your entries, categories,
          and summary.
        </p>
      </div>
    </HomeCard>
  );
};

export default Instructions;
