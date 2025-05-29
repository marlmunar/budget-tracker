import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Log from "../models/log.model.js";

// @desc Get Logs based on UserId
// @route GET /api/logs
// @access PRIVATE
const getLogs = asyncHandler(async (req, res) => {
  const userId = req.query.userId ?? null;
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
  const userId = req.body?.userId || new mongoose.Types.ObjectId();
  const { name, categories, entries } = req.body;
  const newLog = await Log.create({ userId, name, categories, entries });

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
  const log = await Log.findById(id, "_id name categories entries");
  res.status(200).json({
    message: "Successfully fetched",
    data: log,
  });
});

// @desc Update Log
// @route PUT  /api/logs/:id
// @access PRIVATE
const updateLog = asyncHandler(async (req, res) => {
  const { name, categories, entries } = req.body;
  const log = { name, categories, entries };
  const id = req.params.id;

  const updatedLog = await Log.findByIdAndUpdate(id, log, {
    new: true,
    select: "_id name categories entries",
  });
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

export { getLogs, createLog, getLog, updateLog, deleteLog };
