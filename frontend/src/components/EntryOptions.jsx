import { useState } from "react";
import { TbPlus, TbDots, TbArrowLeft } from "react-icons/tb";

const EntryOptions = ({ setActiveAction }) => {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <section className="log-form-container min-w-[min-content] justify-center">
      {isSelecting ? (
        <>
          <div className="log-section-header min-w-[15rem]">
            <button
              className="log-tool-button my-1 mr-2.5"
              onClick={() => setIsSelecting(false)}
            >
              <TbArrowLeft />
            </button>
            <h3>Entry Options</h3>
          </div>
          <div className="bg-slate-100 rounded mt-2">
            <div className="flex flex-col gap-1 p-2">
              <button
                className="entry-button"
                onClick={() => setActiveAction("Editing Category")}
              >
                Edit Categories
              </button>
              <button
                className="entry-button"
                onClick={() => setActiveAction("Deleting Category")}
              >
                Delete Categories
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex md:flex-col gap-2">
          <div className="bg-slate-100 rounded p-1 h-[min-content] w-[min-content]">
            <button
              className="log-tool-button"
              onClick={() => setActiveAction("Adding Entry")}
            >
              <TbPlus />
            </button>
          </div>
          <div className="bg-slate-100 rounded p-1 h-[min-content] w-[min-content]">
            <button
              className="log-tool-button"
              onClick={() => setIsSelecting(true)}
            >
              <TbDots />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EntryOptions;
