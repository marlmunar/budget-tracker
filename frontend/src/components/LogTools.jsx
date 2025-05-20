const LogTools = () => {
  return (
    <section className="p-2 rounded-lg shadow">
      <h3 className="text-xl font-semibold">Log Tools</h3>
      <div className="flex justify-between min-h-12 items-center">
        <div className="flex gap-2">
          <button className="border min-h-8 px-2 py-1 rounded">
            Create New Log
          </button>
          <button className="border min-h-8 px-2 py-1 rounded">
            Manage Logs
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className="border rounded-xl px-4 min-h-8"
            type="search"
            id="search-log"
            placeholder="Search by name..."
          />
          <button className="border min-h-8 px-2 py-1 rounded">Search</button>
        </div>
      </div>
    </section>
  );
};

export default LogTools;
