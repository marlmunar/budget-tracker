import { Link } from "react-router-dom";
import { TbDotsVertical } from "react-icons/tb";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import RenameModal from "./RenameModal";
import {
  useDeleteLogMutation,
  useUpdateLogMutation,
} from "../slices/logsApiSlice";
import OutsideClick from "./OutsideClick";

const LogCard = ({ logName, logStats, logId, setLastAction }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(logName);
  const [isSelecting, setIsSelecting] = useState(false);
  const [updateLog] = useUpdateLogMutation();
  const [deleteLog] = useDeleteLogMutation();

  // const handleRename = async (name) => {
  //   try {
  //     const res = await updateLog({
  //       id: logId,
  //       data: { name },
  //     }).unwrap();
  //     console.log(res);
  //     setLastAction(Date.now());
  //   } catch (error) {
  //     console.log(error?.data?.message || error.message);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const res = await deleteLog({
  //       id: logId,
  //     }).unwrap();
  //     console.log(res);
  //     setLastAction(Date.now());
  //   } catch (error) {
  //     console.log(error?.data?.message || error.message);
  //   }
  // };

  return (
    <div className="relative mx-auto flex md:w-[98%] m-1 trasition-all duration-100 bg-white shadow-slate-300 shadow-sm rounded hover:shadow-lg hover:mb-2 hover:mt-1 ">
      <Link
        to={`/log/${logId}`}
        className="p-2 pb-4 w-full"
        onClick={() => console.log("clicked")}
      >
        <div className="flex flex-col gap-1">
          <h3 className="md:mr-13 mr-12 grow text-base md:text-lg font-semibold bg-gray-200 rounded p-2 ">
            {displayName}
          </h3>

          <div className="flex gap-2 px-2 text-[0.75rem] md:text-sm text-gray-800">
            <p>{logStats.lastEdited}</p>
            <p>
              {logStats.entries} {logStats.entries > 1 ? "entries" : "entry"}
            </p>
          </div>
        </div>
      </Link>
      <button
        title="Options"
        data-info="exempted"
        onClick={() => setIsSelecting(true)}
        className="log-tool-button absolute top-2 right-2 md:min-h-11 md:min-w-11 bg-gray-200 border-2 border-transparent hover:border-slate-400 rounded"
      >
        <TbDotsVertical />
      </button>
      {isSelecting && (
        <OutsideClick onOutsideClick={() => setIsSelecting(false)}>
          <menu className="z-5 absolute top-13 shadow shadow-slate-500 right-2 rounded mt-2 p-2 bg-white flex flex-col gap-1 min-w-[15%]">
            <button className="log-button">Rename</button>
            <button className="log-button">Edit</button>
            <button className="log-button">Delete</button>
          </menu>
        </OutsideClick>
      )}
    </div>
  );
};

export default LogCard;

{
  /* {isRenaming && (
          <RenameModal
            isRenaming={isRenaming}
            setIsRenaming={setIsRenaming}
            displayName={displayName}
            handleSubmit={(tempName) => {
              setIsRenaming(false);
              setDisplayName(tempName);
              handleRename(tempName);
            }}
            title="Edit Log Name"
            description="Edit the name of your log"
          />
        )} */
}
{
  /* {isDeleting && (
          <ConfirmModal
            isOpen={isDeleting}
            setIsOpen={setIsDeleting}
            handleConfirm={() => {
              setIsDeleting(false);
              handleDelete();
            }}
            action="Delete"
            description={`Delelete ${displayName}?`}
          />
        )} */
}
