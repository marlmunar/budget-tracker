import mongoose from "mongoose";
import Log from "../models/log.model.js";

const validateId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const logExists = await Log.exists({ _id: id });
    if (!logExists) {
      return res.status(404).json({ message: "Record not found" });
    }

    next();
  } catch (error) {
    console.error("Error validating ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default validateId;
