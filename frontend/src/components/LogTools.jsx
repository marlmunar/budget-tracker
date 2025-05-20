const LogTools = () => {
  return (
    <section className="bg-gray-400 p-2 rounded-lg shadow">
      <div className="flex justify-between min-h-12 items-center">
        <div className="flex gap-2">
          <button className="bg-blue-800 text-white border min-h-8 px-2 py-1 rounded overflow-ellipsis">
            Create New Log
          </button>
          <button className="bg-blue-800 text-white border min-h-8 px-2 py-1 rounded">
            Manage Logs
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className="bg-white border rounded-xl px-4 min-h-8"
            type="search"
            id="search-log"
            placeholder="Search by name..."
          />
          <button className="bg-blue-800 text-white border min-h-8 px-2 py-1 rounded">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogTools;
