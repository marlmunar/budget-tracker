import { useState } from "react";
import { TbSearch, TbPlus } from "react-icons/tb";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useCreateLogMutation } from "../slices/logsApiSlice";
import { useNavigate } from "react-router-dom";

const LogTools = () => {
  const navigate = useNavigate();
  const { defaultCategories } = useSelector((state) => state.logs);
  const [createLog, { isLoading }] = useCreateLogMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [logName, setLogName] = useState("");

  const handleAdd = async () => {
    try {
      const res = await createLog({
        name: logName,
        categories: defaultCategories,
      }).unwrap();
      navigate(`/log/${res.data._id}`);
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }

    setLogName("");
  };

  return (
    <section className="bg-gray-400 p-2 rounded-lg shadow">
      <div className="flex justify-between lg:min-h-12 items-center">
        <div className="flex gap-2">
          <button
            className="bg-blue-800 text-white border-2 min-h-8 px-2 py-1 rounded lg:min-w-[6rem] hover:border-transparent hover:shadow shadow-slate-800"
            onClick={() => setIsAdding(true)}
          >
            <span className="hidden lg:block">Add New</span>
            <TbPlus className="text-xl lg:hidden" />
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
      {isAdding && (
        <Modal
          isOpen={isAdding}
          onClose={() => {
            setIsAdding(false);
            setLogName("");
          }}
          title="Add New Log"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAdding(false);
              handleAdd();
            }}
            className="flex flex-col items-center gap-2 p-2"
          >
            <label htmlFor="logName">Please provide your log name</label>
            <input
              type="text"
              name="logName"
              className="form-input"
              value={logName}
              onChange={(e) => setLogName(e.target.value)}
              autoComplete="off"
            />
            <div className="button-row">
              <button className="modal-button" type="submit">
                Save
              </button>
              <button
                className="modal-button"
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setLogName("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default LogTools;
