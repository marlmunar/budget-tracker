import React, { useState } from "react";

const Rename = ({ name }) => {
  const [nameToEdit, setNameToEdit] = useState(name);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-2 p-2 md:p-0" onSubmit={handleSubmit}>
      <h3 className="text-xl mt-1 font-semibold ml-2">Rename Log</h3>
      <div className="modal-input-container px-2">
        <label className="flex items-center gap-1" htmlFor="newName">
          Edit name of
          <span className="font-semibold max-w-[15ch] inline-block truncate">
            "{name}"
          </span>
        </label>
        <input
          value={nameToEdit}
          id="newName"
          onChange={(e) => setNameToEdit(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <button className="modal-action-button mr-2" formNoValidate>
        Save
      </button>
    </form>
  );
};

export default Rename;
