import React from "react";

const LogCard = ({ logName, logStats }) => {
  return (
    <div class="p-2 pb-4 flex justify-between gap-2 border-b-2 border-slate-500 rounded">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold underline">{logName}</h3>
        <div className="text-sm text-gray-800">
          <p>Categories: {logStats.categories}</p>
          <p>Last edited: {logStats.lastEdited}</p>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        <button className="border px-2 py-1 rounded max-h-8">Rename</button>
        <button className="border px-2 py-1 rounded max-h-8">Edit</button>
        <button className="border px-2 py-1 rounded max-h-8">Delete</button>
      </div>
    </div>
  );
};

export default LogCard;
