import { Link } from "react-router-dom";
import { TbDotsVertical, TbPencil, TbTrash, TbX } from "react-icons/tb";
import { useState } from "react";
import OutsideClick from "./OutsideClick";
import { useDispatch } from "react-redux";
import { setModalState } from "../slices/appSlice";

const LogCard = ({ logName, logStats, logId, logData }) => {
  const dispatch = useDispatch();
  const [isSelecting, setIsSelecting] = useState(false);
  const logTypes = {
    1: "General Tracker",
    2: "Saving Goal",
    3: "Budget with Deadline",
  };

  return (
    <div className="border relative mx-auto flex md:w-[98%] m-1 trasition-all duration-100 bg-white shadow-slate-300 shadow-sm rounded hover:shadow-lg hover:mb-2 hover:mt-1 ">
      <div className="p-2 pb-4 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex p-1 justify-between">
            <div className="grow flex flex-col gap-2">
              <Link
                to={`/log/${logId}`}
                className="block text-base px-1 pt-2 mx-h-[min-content] md:text-xl font-semibold "
              >
                {logName}
              </Link>
              <div className="px-1 flex flex-col text-[0.75rem] md:text-sm text-gray-800">
                <p className="text-[0.65rem] md:text-[0.70rem]">
                  {logStats.lastEdited}
                </p>
                <p>{logTypes[logData.type]}</p>
                <p>
                  {`${logStats.entries} ${
                    logStats.entries > 1 ? "entries" : "entry"
                  }`}
                </p>
              </div>
            </div>

            <OutsideClick
              onOutsideClick={() => setIsSelecting(false)}
              id={logId}
            >
              <div onClick={(e) => e.stopPropagation()} className="flex gap-2">
                {isSelecting && (
                  <>
                    <button
                      className="log-tool-button min-h-7 w-7 md:min-h-9 md:w-9 
                       text-blue-950"
                      onClick={() =>
                        dispatch(
                          setModalState({
                            showModal: true,
                            activeModal: "rename",
                            modalData: { name: logName, id: logId },
                          })
                        )
                      }
                    >
                      <TbPencil />
                    </button>

                    <button
                      className="log-tool-button min-h-7 w-7 md:min-h-9 md:w-9 
                      text-red-700 hover:text-red-800"
                      onClick={() =>
                        dispatch(
                          setModalState({
                            showModal: true,
                            activeModal: "delete",
                            modalData: {
                              name: logName,
                              type: "log",
                              id: logId,
                            },
                          })
                        )
                      }
                    >
                      <TbTrash />
                    </button>
                  </>
                )}
                <button
                  title="Options"
                  data-id={logId}
                  onClick={() => setIsSelecting((prev) => !prev)}
                  className="log-tool-button min-h-7 w-7 md:min-h-9 md:w-9
                  text-gray-700 hover:text-gray-800"
                >
                  {isSelecting ? <TbX /> : <TbDotsVertical />}
                </button>
              </div>
            </OutsideClick>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogCard;
