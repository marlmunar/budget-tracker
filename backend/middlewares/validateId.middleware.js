import mongoose from "mongoose";

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Unexpected ID format" });
  }

  next();
};

export default validateId;
