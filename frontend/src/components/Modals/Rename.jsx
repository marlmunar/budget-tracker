import React, { useState } from "react";

const Rename = ({ name }) => {
  const [nameToEdit, setNameToEdit] = useState(name);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">Edit Log Name </h3>
      <input
        value={nameToEdit}
        onChange={(e) => setNameToEdit(e.target.value)}
        autoComplete="off"
        required
      />

      <button className="shadow rounded w-18 py-2 self-end">Save</button>
    </form>
  );
};

export default Rename;
