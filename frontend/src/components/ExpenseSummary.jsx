import { TbReload } from "react-icons/tb";
import ExpenseSummaryItem from "./ExpenseSummaryItem";
import NoRecords from "./NoRecords";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GeneralTracker from "./Summaries/GeneralTracker";
import SavingsTracker from "./Summaries/SavingsTracker";

const ExpenseSummary = ({ props }) => {
  const { selectedCategories, setSelectedCategories, logData } = props;
  const { tempCategories } = useSelector((state) => state.logs);
  const { tempEntries } = useSelector((state) => state.logs);

  const filteredList = tempEntries.filter((entry) =>
    selectedCategories.includes(entry.category.name)
  );

  const [displayReload, setDisplayReload] = useState(false);

  useEffect(() => {
    if (tempCategories.length === selectedCategories.length) {
      setDisplayReload(false);
    }
  }, [selectedCategories, tempCategories]);

  const formatNumber = (value) => {
    if (!value) return "0";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");

    const trimmedDecimal = decimalPart ? decimalPart.slice(0, 4) : "";

    return trimmedDecimal ? `${formattedInt}.${trimmedDecimal}` : formattedInt;
  };

  const summaries = {
    1: (
      <GeneralTracker
        props={{
          filteredList,
          formatNumber,
          displayReload,
          setDisplayReload,
          setSelectedCategories,
        }}
      />
    ),
    2: (
      <SavingsTracker
        props={{
          filteredList,
          formatNumber,
          displayReload,
          setDisplayReload,
          setSelectedCategories,
          logData,
        }}
      />
    ),
    3: "Budget with Deadline",
  };

  const getSummary = () => summaries[logData?.type] || null;

  return (
    <section className="log-section-container">
      <div className="log-section-header">
        <h2 className="h-10 flex items-center">Log Summary</h2>
        {displayReload && (
          <button
            className="log-tool-button h-10 w-10 bg-slate-200"
            onClick={() => {
              setSelectedCategories(tempCategories.map((cat) => cat.name));
              setDisplayReload(false);
            }}
          >
            <TbReload />
          </button>
        )}
      </div>

      {tempEntries.length > 0 ? (
        <div className="flex text-xs md:text-sm flex-col gap-2 p-2">
          {getSummary()}
        </div>
      ) : (
        <NoRecords />
      )}
    </section>
  );
};

export default ExpenseSummary;
