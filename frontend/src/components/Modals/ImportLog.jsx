import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { TbFile } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useImportLogMutation,
  useUpdateLogMutation,
} from "../../slices/logsApiSlice";
import { setTempCategories, setTempEntries } from "../../slices/logSlice";
import { startLoading, stopLoading } from "../../slices/appSlice";

const ImportLog = ({ closeModal, resource }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  //   const fileInputRef = useRef(null);
  const { logId } = useParams();
  const dispatch = useDispatch();

  const [importLog] = useImportLogMutation();
  const [updateLog] = useUpdateLogMutation();

  const { tempEntries } = useSelector((state) => state.logs);
  const { tempCategories } = useSelector((state) => state.logs);

  const handleChange = (e) => {
    const input = e.target.files[0];

    if (!input) return;

    if (
      input.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("Invalid file type");
      setFile(null);
    } else {
      setError("");
      setFile(input);
    }

    e.target.value = "";
  };

  const referenceEntries = tempEntries.map((entry) => {
    const keys = ["expense", "amount", "category", "date"];

    return JSON.stringify(
      Object.fromEntries(keys.map((key) => [key, entry[key]]))
    );
  });

  const referenceCategories = tempCategories.map((entry) => {
    const keys = ["name", "color", "type"];

    return JSON.stringify(
      Object.fromEntries(keys.map((key) => [key, entry[key]]))
    );
  });

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    let needUpdate;
    let hadError;

    try {
      const res = await importLog(formData).unwrap();
      const newTempEntries = res.entries.filter(
        (entry) => !referenceEntries.includes(JSON.stringify(entry))
      );

      const newTempCategories = res.categories.filter(
        (category) => !referenceCategories.includes(JSON.stringify(category))
      );

      if (newTempEntries.length < 1 && newTempCategories.length < 1) {
        return;
      }

      if (newTempCategories.length >= 1) {
        const updatedCategories = [...tempCategories, ...newTempCategories];
        dispatch(setTempCategories(updatedCategories));
      }

      if (newTempEntries.length >= 1) {
        const updatedEntries = [...tempEntries, ...newTempEntries];
        dispatch(setTempEntries(updatedEntries));
      }

      needUpdate(true);
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      hadError = true;
      setError(errorMsg);
    } finally {
      if (hadError) return;
      if (!needUpdate) return closeModal();

      try {
        dispatch(startLoading());
        const res = await updateLog({
          id: logId,
          data: { categories: tempCategories, entries: tempEntries },
        }).unwrap();
        closeModal();
        setError("");
        setFile(null);
      } catch (error) {
        const errorMsg = error?.data?.message || error.message;
        setError(errorMsg);
      } finally {
        dispatch(stopLoading());
      }
    }
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
