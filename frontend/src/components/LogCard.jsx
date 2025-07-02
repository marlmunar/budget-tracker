import { Link } from "react-router-dom";
import { TbDotsVertical } from "react-icons/tb";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import RenameModal from "./RenameModal";
import {
  useDeleteLogMutation,
  useUpdateLogMutation,
} from "../slices/logsApiSlice";

const LogCard = ({ logName, logStats, logId, setLastAction }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(logName);
  const [updateLog] = useUpdateLogMutation();
  const [deleteLog] = useDeleteLogMutation();

  const handleRename = async (name) => {
    try {
      const res = await updateLog({
        id: logId,
        data: { name },
      }).unwrap();
      console.log(res);
      setLastAction(Date.now());
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteLog({
        id: logId,
      }).unwrap();
      console.log(res);
      setLastAction(Date.now());
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  return (
    <div className="relative flex w-[98%] mx-auto trasition-all duration-100 bg-white shadow gap-2 rounded hover:shadow-lg hover:mb-2 hover:mt-1 hover:scale-x-[1.001]">
      <Link
        to={`/log/${logId}`}
        className="p-2 pb-4 w-full"
        onClick={() => console.log("clicked")}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold hover:bg-white">
            {displayName}
          </h3>
          <div className="text-sm text-gray-800">
            <p>Entries: {logStats.entries}</p>
            <p>Last edited: {logStats.lastEdited}</p>
          </div>
        </div>
        {isRenaming && (
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
        )}
        {isDeleting && (
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
        )}
      </Link>

      <button
        title="Options"
        onClick={() => console.log(options)}
        className="absolute right-2 top-2 text-xl self-start hover:bg-slate-200 p-2 rounded"
      >
        <TbDotsVertical />
      </button>
    </div>
  );
};

export default LogCard;
