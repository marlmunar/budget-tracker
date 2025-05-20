import React from "react";

const LogCard = ({ logName, logStats }) => {
  return (
    <div class="p-2 pb-4 flex flex-col border-b-2 border-slate-500 rounded">
      <h3 className="text-lg font-semibold underline">{logName}</h3>
      <div className="flex justify-between">
        <div className="text-sm text-gray-800">
          <p>Categories: {logStats.categories}</p>
          <p>Last edited: {logStats.lastEdited}</p>
        </div>
        <div className="flex gap-2">
          <button className="border px-2 py-1 rounded">Rename</button>
          <button className="border px-2 py-1 rounded">Edit</button>
          <button className="border px-2 py-1 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default LogCard;
