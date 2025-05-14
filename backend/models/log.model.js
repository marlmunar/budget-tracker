import mongoose from "mongoose";

const logSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
      unique: true,
    },
    entries: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
