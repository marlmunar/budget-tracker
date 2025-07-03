import React from "react";

const Delete = ({ resource }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">Deleting {resource.name} </h3>
      <p>Do you want to delete this {resource.type}?</p>
      <div className="self-end">
        <button className="shadow rounded w-18 py-2 mr-2">Confirm</button>
        <button className="shadow rounded w-18 py-2">Cancel</button>
      </div>
    </form>
  );
};

export default Delete;
