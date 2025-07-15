import {
  TbLogs,
  TbDeviceSdCard,
  TbFileAnalytics,
  TbFileDots,
  TbFileDownload,
  TbFilePencil,
  TbFileX,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import OutsideClick from "./OutsideClick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotSaved } from "../slices/logSlice";
import { setModalState, startLoading, stopLoading } from "../slices/appSlice";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const LogScreenHeader = ({ logData }) => {
  const dispatch = useDispatch();
  const id = logData._id;
  const { name } = logData;
  const lastUpdate = new Date(logData.updatedAt);
  const [elapsedTime, setElapsedTime] = useState("");
  const { isNotSaved } = useSelector((state) => state.logs);
  const { tempEntries } = useSelector((state) => state.logs);
  const [updateLog] = useUpdateLogMutation();

  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    updateLastSave();
    const intervalId = setInterval(() => {
      updateLastSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [lastUpdate]);

  const handleSave = async () => {
    if (!isNotSaved) return;
    try {
      dispatch(startLoading());
      const res = await updateLog({
        id,
        data: { ...logData, entries: tempEntries },
      }).unwrap();
      dispatch(setIsNotSaved(false));
    } catch (error) {
      console.log(error?.data?.message || error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  const formatElapsedTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 5) return "just now";
    if (seconds < 60) return "less than a minute ago";
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  function updateLastSave() {
    const elapsed = Date.now() - lastUpdate;
    setElapsedTime(formatElapsedTime(elapsed));
  }

  return (
    <div className="bg-gray-100 mx-auto rounded-b shadow w-full flex">
      <div
        className="mx-auto px-2 md:px-0 text-lg lg:text-xl
                  w-full relative
                  lg:max-w-[90%] min-h-18"
      >
        <div className="flex items-center gap-1 md:gap-2 h-full">
          <Link to="/logs" className="log-button">
            <TbLogs />
          </Link>
          <div className="flex-1 flex flex-col">
            <h2 className="font-semibold text-base md:text-xl">{name}</h2>
            <span className="text-gray-500 text-[0.65rem] md:text-[0.7rem] italic">
              {isNotSaved
                ? "Log has unsaved changes"
                : `Log was updated ${elapsedTime}`}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <div className="hidden md:block">
              <button className="log-button" onClick={handleSave}>
                <TbDeviceSdCard />
              </button>
            </div>

            <button
              data-id="options"
              name="buttoners"
              className="log-button"
              onClick={() => {
                setIsSelecting((prev) => !prev);
              }}
            >
              <TbFileDots />
            </button>
          </div>
        </div>
        {isSelecting && (
          <OutsideClick
            onOutsideClick={() => {
              setIsSelecting(false);
            }}
            id="options"
          >
            <menu
              className="z-5 
                absolute
                top-[80%]
                right-2
                md:right-0
                rounded
                w-32 text-base 
                p-1 md:px-1 flex flex-col items-center gap-1 
                shadow shadow-slate-500 bg-white"
            >
              <li className="md:hidden">
                <button
                  className="log-options"
                  onClick={() => {
                    handleSave();
                    setIsSelecting(false);
                  }}
                >
                  <TbDeviceSdCard />
                  <span>Save</span>
                </button>
              </li>
              <li>
                <button
                  className="log-options"
                  onClick={() => {
                    setIsSelecting(false);
                    dispatch(
                      setModalState({
                        showModal: true,
                        activeModal: "rename",
                        modalData: { name, id },
                      })
                    );
                  }}
                >
                  <TbFilePencil />
                  <span>Rename</span>
                </button>
              </li>
              <li>
                <button
                  className="log-options"
                  onClick={() => {
                    // handleDownload();
                    // setIsSelecting(false);
                  }}
                >
                  <TbFileDownload />
                  <span>Download</span>
                </button>
              </li>
              <li>
                <Link
                  className="log-options"
                  //   to={`/visualize/${logId}`}
                >
                  <TbFileAnalytics />
                  <span>Visualize</span>
                </Link>
              </li>
              <li>
                <button
                  className="log-options text-red-500"
                  onClick={() => {
                    setIsSelecting(false);
                    dispatch(
                      setModalState({
                        showModal: true,
                        activeModal: "delete",
                        modalData: {
                          name: name,
                          type: "log",
                          id,
                        },
                      })
                    );
                  }}
                >
                  <TbFileX />
                  <span>Delete</span>
                </button>
              </li>
            </menu>
          </OutsideClick>
        )}

        {/* {error && (
        <div className="absolute top-12 right-0 bg-slate-50 shadow-lg p-2 rounded text-red-500 text-sm italic ml-auto self-center">
          {error}
        </div>
      )} */}
      </div>
    </div>
  );
};

export default LogScreenHeader;
