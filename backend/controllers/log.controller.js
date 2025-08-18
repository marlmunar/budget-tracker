import asyncHandler from "express-async-handler";
import Log from "../models/log.model.js";
import generateImport from "../utils/generateImport.js";
import generateExport from "../utils/generateExport.js";

// @desc Get Logs based on UserId
// @route GET /api/logs
// @access PRIVATE
const getLogs = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(400);
    throw new Error("Bad request: UserId is missing");
  }

  const logs = await Log.find({ userId });
  res.status(200).json({
    message: "Successfully fetched",
    data: logs,
  });
});

// @desc Create Log
// @route POST /api/logs
// @access PRIVATE
const createLog = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, logData, categories } = req.body;
  const newLog = await Log.create({ userId, logData, name, categories });

  res.status(201).json({
    message: "Successfully created",
    data: newLog,
  });
});

// @desc Get Log
// @route GET  /api/logs/:id
// @access PRIVATE
const getLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const log = await Log.findById(id);

  if (!log.userId.equals(userId)) {
    res.status(400);
    throw new Error("Log is not available");
  }

  const resultLog = await Log.findById(
    id,
    "_id name logData categories entries updatedAt"
  );

  res.status(200).json({
    message: "Successfully fetched",
    data: resultLog,
  });
});

// @desc Update Log
// @route PUT  /api/logs/:id
// @access PRIVATE
const updateLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const log = await Log.findById(id);

  log.name = req.body.name ?? log.name;
  log.categories = req.body.categories ?? log.categories;
  log.entries = req.body.entries ?? log.entries;
  log.logData = req.body.logData ?? log.logData;

  const updatedLog = await log.save();

  res.status(200).json({
    message: "Successfully updated",
    data: updatedLog,
  });
});

// @desc Delete Log
// @route DELETE /api/logs/:id
// @access PRIVATE
const deleteLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Log.findByIdAndDelete(id);
  res.status(200).json({
    message: "Successfully deleted",
  });
});

// @desc Download Log
// @route GET /api/logs/download/:id
// @access PRIVATE
const downloadLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const log = await Log.findById(id);

  if (!log.userId.equals(userId) || log.entries.length < 1) {
    res.status(400);
    throw new Error("Log is not available");
  }

  const { fileName, buffer } = await generateExport(log);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.xlsx"`
  );

  res.end(buffer);
});

// @desc Import Log
// @route PORT /api/logs/import
// @access PRIVATE
const importLog = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  setTimeout(() => {
    if (!res.headersSent) {
      return res.status(400).json({ message: "Failed to import data" });
    }
  }, 5000);

  try {
    const { entries, categories, logData } = await generateImport(file);
    res.status(200).json({
      message: "Successfully imported",
      entries,
      categories,
      logData,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export {
  getLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
  downloadLog,
  importLog,
};
