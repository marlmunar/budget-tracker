import { useState } from "react";
import { TbSearch, TbPlus, TbX } from "react-icons/tb";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useCreateLogMutation } from "../slices/logsApiSlice";
import { useNavigate } from "react-router-dom";
import { setModalState } from "../slices/appSlice";

const LogTools = ({ searchState, setSearchState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultCategories } = useSelector((state) => state.logs);
  const [createLog, { isLoading }] = useCreateLogMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [logName, setLogName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { isSearching, searchText } = searchState;

  const handleAdd = async () => {
    if (!logName) return;
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

  const handleSearchText = async (e) => {
    setSearchState((prev) => ({ ...prev, searchText: e.target.value }));
    if (e.target.value === "") {
      setSearchState((prev) => ({ ...prev, isSearching: false }));
      return;
    }
    setSearchState((prev) => ({ ...prev, isSearching: true }));
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex justify-end grow gap-2">
          {showSearch ? (
            <>
              <form
                method="POST"
                className="relative bg-white border-2 w-full text-black rounded-xl px-2 pr-8 min-h-8  lg:w-[16.5rem] lg:max-w-none flex items-center justify-between"
              >
                <input
                  className="focus:outline-none focus:ring-0 w-full"
                  type="text"
                  id="search-log"
                  placeholder="Search by name..."
                  onChange={(e) => handleSearchText(e)}
                  value={searchText}
                  autoComplete="off"
                />
                {isSearching && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchState((prev) => ({
                        isSearching: false,
                        searchText: "",
                      }));
                    }}
                    className="right-2 absolute rounded-xl h-[min-content] w-[min-content] text-base border text-gray-500 border-gray-500 
                    hover:shadow hover:shadow-gray-700 hover:border-transparent"
                  >
                    <TbX />
                  </button>
                )}
              </form>

              <button
                className="max-h-10 log-button-2 "
                onClick={() => {
                  setShowSearch(false),
                    setSearchState({ isSearching: false, searchText: "" });
                }}
              >
                <span className="text-sm md:text-[length:inherit]">Cancel</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="log-button-2 top-[80vh] shadow md:shadow-none right-4 fixed min-w-18 max-h-18 flex flex-col md:static md:flex-row"
                onClick={() =>
                  dispatch(
                    setModalState({
                      showModal: true,
                      activeModal: "addLog",
                    })
                  )
                }
              >
                <TbPlus className="text-4xl md:text-[length:inherit]" />
                <span className="text-xs md:text-[length:inherit]">
                  Add New
                </span>
              </button>

              <button
                className="log-button-2 min-w-10 top-2 absolute md:static max-h-10"
                onClick={() => setShowSearch(true)}
              >
                <TbSearch />
                <span className=" hidden md:block">Search</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* {isAdding && (
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
      )} */}
    </>
  );
};

export default LogTools;
