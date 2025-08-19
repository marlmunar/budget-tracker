import React from "react";
import { useState } from "react";
import { TbFile } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useImportLogMutation,
  useUpdateLogMutation,
} from "../../slices/logsApiSlice";
import {
  setLastAction,
  startLoading,
  stopLoading,
} from "../../slices/appSlice";

const ImportLog = ({ closeModal, resource }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
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

  const referenceCategories = tempCategories.map((category) => category.name);

  const filterEntries = (entries) => {
    let filteredEntries = entries.filter(
      (entry) => !referenceEntries.includes(JSON.stringify(entry))
    );

    if (resource?.type === 2) {
      return filteredEntries.filter(
        (entry) => entry.category.type === "Income"
      );
    }

    if (resource?.type === 3) {
      return filteredEntries
        .filter((entry) => entry.category.type === "Expense")
        .filter((entry) => new Date(entry.date) > new Date(resource.startDate));
    }

    return filteredEntries;
  };

  const filterCategories = (categories) => {
    let filteredCategories = categories.filter(
      (category) => !referenceCategories.includes(category.name)
    );

    if (resource?.type === 2) {
      return filteredCategories.filter(
        (category) => category.type === "Income"
      );
    }

    if (resource?.type === 3) {
      return filteredCategories.filter(
        (category) => category.type === "Expense"
      );
    }

    return filteredCategories;
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    let needUpdate;
    let hadError;
    let updatedEntries = tempEntries;
    let updatedCategories = tempCategories;

    try {
      const res = await importLog(formData).unwrap();
      const newTempCategories = filterCategories(res.categories);
      const entries = res.entries.map((entry) => ({
        ...entry,
        category:
          updatedCategories.find(
            (category) => category.name === entry.category.name
          ) || entry.category,
      }));
      const newTempEntries = filterEntries(entries);

      if (newTempEntries.length < 1 && newTempCategories.length < 1) {
        return;
      }

      if (newTempCategories.length >= 1) {
        updatedCategories = [...tempCategories, ...newTempCategories];
      }

      if (newTempEntries.length >= 1) {
        updatedEntries = [...tempEntries, ...newTempEntries];
      }

      needUpdate = true;
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
          data: { categories: updatedCategories, entries: updatedEntries },
        }).unwrap();

        dispatch(setLastAction(Date.now()));
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
