import LogCard from "./LogCard";
import LogTools from "./LogTools";

const Logs = () => {
  return (
    <div>
      <section className=" flex flex-col gap-2 p-4 shadow rounded">
        <h2 className="text-xl font-semibold">Your Logs</h2>
        <LogTools />
        <LogCard
          logName={"Log 2"}
          logStats={{ categories: "21 categories", lastEdited: "2 days ago" }}
        />
        <LogCard
          logName={"Log 1"}
          logStats={{ categories: "5 categories", lastEdited: "a month ago" }}
        />
      </section>
    </div>
  );
};

export default Logs;
