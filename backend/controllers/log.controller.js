import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Log from "../models/log.model.js";

// @desc Get Logs
// @route GET /api/logs
// @access PUBLIC
const getLogs = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is get logs path",
  });
});

// @desc Create Log
// @route POST /api/logs
// @access PUBLIC
const createLog = asyncHandler(async (req, res) => {
  const userId = req.body?.userId || new mongoose.Types.ObjectId();
  const { name, categories, entries } = req.body;
  const newLog = await Log.create({ userId, name, categories, entries });

  res.status(201).json({
    message: "Successful",
    data: newLog,
  });
});

// @desc Get Log
// @route GET  /api/logs/:id
// @access PUBLIC
const getLog = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is get log path",
  });
});

// @desc Update Log
// @route PUT  /api/logs/:id
// @access PUBLIC
const updateLog = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is update log path",
  });
});

// @desc Delete Log
// @route DELETE /api/logs/:id
// @access PUBLIC
const deleteLog = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello, this is delete log path",
  });
});

export { getLogs, createLog, getLog, updateLog, deleteLog };
