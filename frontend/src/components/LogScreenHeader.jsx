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
import { useState } from "react";

const LogScreenHeader = ({ logName }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  return (
    <div className="bg-gray-100 mx-auto rounded-b shadow w-full">
      <div className="mx-auto px-4 lg:px-10 relative text-lg lg:text-xl flex justify-between items-center lg:max-w-[90%] min-h-18">
        <div className="flex gap-2 items-center ">
          <Link to="/logs" className="log-button">
            <TbLogs />
          </Link>
          <h2 className="font-semibold">{logName}</h2>
        </div>

        {/* {error && (
        <div className="absolute top-12 right-0 bg-slate-50 shadow-lg p-2 rounded text-red-500 text-sm italic ml-auto self-center">
          {error}
        </div>
      )} */}

        <div className="relative">
          <div className="flex gap-2 items-center">
            <span className="text-[0.65rem] md:text-sm italic">
              {/* <LogScreenStatus isNotSaved={isNotSaved} lastAction={lastAction} /> */}
            </span>
            <button
              className="log-button"
              //   onClick={handleSave}
            >
              <TbDeviceSdCard />
            </button>
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

          {isSelecting && (
            <OutsideClick
              onOutsideClick={() => {
                //   setIsSelecting(false);
              }}
              id="options"
            >
              <menu className="z-10 absolute top-[2.8rem] right-0 border-2 w-32 text-base p-2 flex flex-col items-center gap-2 shadow-lg bg-white rounded ">
                <li>
                  <button
                    className="log-options"
                    onClick={() => {
                      // setIsRenaming(true);
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
                      // setIsDeleting(true);
                    }}
                  >
                    <TbFileX />
                    <span>Delete</span>
                  </button>
                </li>
              </menu>
            </OutsideClick>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogScreenHeader;
