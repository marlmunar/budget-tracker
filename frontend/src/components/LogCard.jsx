import { Link } from "react-router-dom";
import { TbPencil, TbArrowsDiagonal2, TbTrash } from "react-icons/tb";
import { useState } from "react";
import Modal from "./Modal";
import Rename from "./Rename";

const LogCard = ({ logName, logStats }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(logName);

  return (
    <div className="p-2 pb-4 flex justify-between gap-2 border-b-2 border-slate-500 rounded">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold underline">{displayName}</h3>
        <div className="text-sm text-gray-800">
          <p>Categories: {logStats.categories}</p>
          <p>Last edited: {logStats.lastEdited}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <TbPencil
          title="Rename"
          className="tool-button"
          onClick={() => setIsRenaming(true)}
        />
        <Link to="/log">
          <TbArrowsDiagonal2 title="Open" className="tool-button" />
        </Link>
        <TbTrash title="Delete" className="tool-button" />
      </div>
      {isRenaming && (
        <Rename
          isRenaming={isRenaming}
          setIsRenaming={setIsRenaming}
          displayName={displayName}
          setDisplayName={setDisplayName}
          title="Edit Log Name"
          description="Edit the name of your log"
        />
      )}
    </div>
  );
};

export default LogCard;
