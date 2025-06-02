import { useNavigate } from "react-router-dom";
import { TbPencil, TbArrowsDiagonal2, TbTrash } from "react-icons/tb";
import { useState } from "react";

import ConfirmModal from "./ConfirmModal";
import RenameModal from "./RenameModal";
import { useUpdateLogMutation } from "../slices/logsApiSlice";

const LogCard = ({ logName, logStats, logId }) => {
  const navigate = useNavigate();
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(logName);
  const [updateLog, { isLoading }] = useUpdateLogMutation();

  const handleRename = async (name) => {
    try {
      const res = await updateLog({
        id: logId,
        data: { name },
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error?.data?.message || error.message);
    }
  };

  return (
    <div className="p-2 pb-4 flex justify-between gap-2 border-b-2 border-slate-500 rounded">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold underline">{displayName}</h3>
        <div className="text-sm text-gray-800">
          <p>Entries: {logStats.entries}</p>
          <p>Last edited: {logStats.lastEdited}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          title="Rename"
          className="tool-button"
          onClick={() => setIsRenaming(true)}
        >
          <TbPencil />
        </button>
        <button
          title="Open"
          className="tool-button"
          onClick={(e) => {
            navigate(`/log/${logId}`);
          }}
        >
          <TbArrowsDiagonal2 />
        </button>

        <button
          title="Delete"
          className="tool-button"
          onClick={() => setIsDeleting(true)}
        >
          <TbTrash />
        </button>
      </div>
      {isRenaming && (
        <RenameModal
          sRenaming={isRenaming}
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
          isOpem={isDeleting}
          setIsOpen={setIsDeleting}
          handleConfirm={() => {
            setIsDeleting(false);
            console.log("Deleting....");
          }}
          action="Delete"
          description={`Delelete ${displayName}?`}
        />
      )}
    </div>
  );
};

export default LogCard;
