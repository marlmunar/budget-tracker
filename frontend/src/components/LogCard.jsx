import { Link } from "react-router-dom";
import { TbPencil, TbArrowsDiagonal2, TbTrash } from "react-icons/tb";

const LogCard = ({ logName, logStats }) => {
  return (
    <div className="p-2 pb-4 flex justify-between gap-2 border-b-2 border-slate-500 rounded">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold underline">{logName}</h3>
        <div className="text-sm text-gray-800">
          <p>Categories: {logStats.categories}</p>
          <p>Last edited: {logStats.lastEdited}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <TbPencil title="Rename" className="tool-button" />
        <Link to="/log">
          <TbArrowsDiagonal2 title="Open" className="tool-button" />
        </Link>
        <TbTrash title="Delete" className="tool-button" />
      </div>
    </div>
  );
};

export default LogCard;
