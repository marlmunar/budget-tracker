import { useState } from "react";
import { TbSearch, TbPlus, TbX } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setModalState } from "../slices/appSlice";

const LogTools = ({ searchState, setSearchState }) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const { isSearching, searchText } = searchState;

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
      <div className="flex gap-2 items-center relative">
        <div className="flex justify-end grow gap-2">
          {showSearch ? (
            <>
              <form
                method="POST"
                className="z-1 relative bg-white border-2 w-full text-black rounded-xl px-2 pr-8 min-h-8  lg:w-[16.5rem] lg:max-w-none flex items-center justify-between"
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
                className="flex log-button-2 min-w-10 max-h-10"
                onClick={() => {
                  setShowSearch(false),
                    setSearchState({ isSearching: false, searchText: "" });
                }}
              >
                <span className="">
                  <TbX />
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                className="hidden md:flex log-button-2 min-w-10 max-h-10"
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
                className="flex log-button-2 min-w-10 top-[-2.6rem] right-0 absolute md:static max-h-10"
                onClick={() => setShowSearch(true)}
              >
                <TbSearch />
                <span className="hidden md:block">Search</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden absolute p-2 top-0 left-0 h-full w-full flex items-end">
        <button
          className="log-button-3 z-5"
          onClick={() =>
            dispatch(
              setModalState({
                showModal: true,
                activeModal: "addLog",
              })
            )
          }
        >
          <TbPlus />
        </button>
      </div>
    </>
  );
};

export default LogTools;
