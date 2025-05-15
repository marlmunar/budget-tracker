import mongoose from "mongoose";
import Log from "../models/log.model.js";
import asyncHandler from "express-async-handler";

const validateId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ID format");
    error.statusCode = 400;
    throw error;
  }

  const logExists = await Log.exists({ _id: id });
  if (!logExists) {
    const error = new Error("Resource not found");
    error.statusCode = 404;
    throw error;
  }

  next();
});

export default validateId;
