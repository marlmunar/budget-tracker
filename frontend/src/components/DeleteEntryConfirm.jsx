import { TbCheck, TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";

const DeleteEntryConfirm = ({ closeUI, props }) => {
  const { entry } = props;
  const dispatch = useDispatch();
  const { tempEntries } = useSelector((state) => state.logs);

  const handleConfirm = () => {
    const newTempEntries = tempEntries.filter(
      (tempEntry) => tempEntry.expense !== entry.expense
    );

    dispatch(setTempEntries(newTempEntries));
    closeUI();
    dispatch(setIsNotSaved(true));
  };

  const formatNumber = (value) => {
    if (!value) return "0";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return trimmedDecimal ? `${formattedInt}.${trimmedDecimal}` : formattedInt;
  };

  return (
    <div className="z-25 bg-white log-form-container w-full absolute  right-2 top-2 shadow shadow-slate-400 max-w-[30rem]">
      <div className="log-section-header">
        <h3 className="text-nowrap mr-5">Confirm Delete</h3>
        <div className="flex gap-2">
          <button
            className="log-tool-button h-10 w-10 bg-slate-200 text-red-600"
            onClick={handleConfirm}
          >
            <TbCheck />
          </button>
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={closeUI}
          >
            <TbX />
          </button>
        </div>
      </div>
      <div className="p-4 px-6 rounded flex flex-col">
        This will this entry:
        <span className="font-semibold text-xl">
          PHP {formatNumber(entry.amount)}
        </span>
        <div>
          <span> {entry.expense}</span>
          <span> {entry.category.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DeleteEntryConfirm;
