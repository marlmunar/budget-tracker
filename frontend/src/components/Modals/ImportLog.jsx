import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { TbFile } from "react-icons/tb";

const ImportLog = ({ closeModal, resource }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (!e.target.files[0].name) return;
    if (
      e.target.files[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("Invalid file type");
      setFile(null);
      return;
    }
    setError("");
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className="relative h-40 rounded
        flex items-center
        border-2 border-gray-200 dark:border-gray-500
        text-sm md:text-base
        focus:outline-none 
        bg-gray-50
        dark:bg-[#3a3a3a] dark:hover:bg-[#3a3a3a]"
      >
        <div className="modal-input-container">
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-xl z-50 flex justify-center items-center"
          >
            {file ? (
              file.name
            ) : (
              <div className="flex items-center gap-2">
                <TbFile className="text-2xl" /> Select a file
              </div>
            )}
          </label>
          <input
            type="file"
            className="absolute hidden"
            id="file-upload"
            accept=".xlsx"
            onChange={handleChange}
            ref={fileInputRef}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}

      <button
        className="modal-action-button self-end"
        onClick={(e) => handleImport(e)}
      >
        Import
      </button>
    </div>
  );
};

export default ImportLog;
