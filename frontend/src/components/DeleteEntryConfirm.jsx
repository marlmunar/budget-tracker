import { TbCheck, TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";

const DeleteEntryConfirm = ({ setIsDeleting, entry }) => {
  const dispatch = useDispatch();
  const { tempEntries } = useSelector((state) => state.logs);

  const handleConfirm = () => {
    const newTempEntries = tempEntries.filter(
      (tempEntry) => tempEntry.expense !== entry.expense
    );

    dispatch(setTempEntries(newTempEntries));
    setIsDeleting(false);
    dispatch(setIsNotSaved(true));
  };

  return (
    <div className="sticky top-5">
      <div className="absolute bg-white p-2 shadow-xl rounded flex flex-col gap-2 right-0 top-0">
        <div className="lg:w-[min-content] bg-slate-500 p-4 rounded">
          <div className="font-semibold text-xl bg-slate-400 p-2 rounded flex justify-between items-center">
            <h3 className="text-nowrap mr-5">Confirm Delete</h3>
            <div className="py-2 flex gap-2 ">
              <button className="log-tool-button" onClick={handleConfirm}>
                <TbCheck />
              </button>
              <button
                className="log-tool-button"
                onClick={() => setIsDeleting(false)}
              >
                <TbX />
              </button>
            </div>
          </div>
          <div className="bg-slate-100 p-1 rounded mt-2 text-center">
            This will delete:
            <span className="font-semibold"> {entry.expense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEntryConfirm;
