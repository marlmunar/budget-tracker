import HomeCard from "./HomeCard";

const Benefits = () => {
  return (
    <HomeCard title={"Why use this log?"}>
      <div className="px-2 flex flex-col md:grid grid-rows-2 grid-cols-2 gap-4">
        <div className="item">
          <h3 className="item-title ">Access Anywhere</h3>
          <p className="text-center">
            All you need is an account, and you can track your budget from
            anywhere.
          </p>
        </div>

        <div className="item">
          <h3 className="item-title ">User-Friendly Workspace</h3>
          <p className="text-center">
            The tool is easy to use. Even beginners can start budgeting in no
            time.
          </p>
        </div>

        <div className="item">
          <h3 className="item-title ">Easy Navigation</h3>
          <p className="text-center">
            Use our tools to filter and search through your finances. You can
            also view your monthly spending history with ease.
          </p>
        </div>

        <div className="item">
          <h3 className="item-title ">Backup Ready</h3>
          <p className="text-center">
            Save a copy of your expenses as a spreadsheet on your device. You
            can import it back into the tracker later.
          </p>
        </div>
      </div>
    </HomeCard>
  );
};

export default Benefits;
