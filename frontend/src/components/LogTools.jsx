import { TbSearch, TbPlus, TbAdjustmentsAlt } from "react-icons/tb";

const LogTools = () => {
  return (
    <section className="bg-gray-400 p-2 rounded-lg shadow">
      <div className="flex justify-between lg:min-h-12 items-center">
        <div className="flex gap-2">
          <button className="bg-blue-800 text-white border-2 min-h-8 px-2 py-1 rounded lg:min-w-[7.5rem] hover:border-transparent hover:shadow shadow-slate-800">
            <span className="hidden lg:block">Add New Log</span>
            <TbPlus className="text-xl lg:hidden" />
          </button>
          <button className="bg-blue-800 text-white border-2 min-h-8 px-2 py-1 rounded lg:min-w-[7.5rem] hover:border-transparent hover:shadow shadow-slate-800">
            <span className="hidden lg:block">Manage Logs</span>
            <TbAdjustmentsAlt className="text-xl lg:hidden" />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className="bg-white border rounded-xl px-4 min-h-8 max-w-[10.95rem] lg:max-w-none hidden lg:block"
            type="search"
            id="search-log"
            placeholder="Search by name..."
          />
          <button className="bg-blue-800 text-white border-2 min-h-8 px-2 py-1 rounded lg:min-w-[5rem] hover:border-transparent hover:shadow shadow-slate-800">
            <span className="hidden lg:block">Search</span>
            <TbSearch className="text-xl lg:hidden" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogTools;
