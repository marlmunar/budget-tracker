import React from "react";

const Delete = ({ resource }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">Delete {resource.name} </h3>
      <p className="modal-input-container">
        Do you want to delete this {resource.type}?
      </p>
      <div className="self-end flex gap-2">
        <button className="modal-delete-button">Confirm</button>
        <button className="modal-action-button">Cancel</button>
      </div>
    </form>
  );
};

export default Delete;
