import mongoose from "mongoose";

const logSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    categories: {
      type: [
        {
          name: { type: String, required: true },
          color: { type: String, required: true },
          subType: { type: String, required: true },
        },
      ],
      _id: false,
      validate: {
        validator: function (categories) {
          const names = categories.map((c) => c.name.toLowerCase());
          return names.length === new Set(names).size;
        },
        message: "Category names must be unique.",
      },
    },
    entries: {
      type: [
        {
          expense: { type: String, required: true },
          amount: { type: Number, required: true },
          category: {
            name: { type: String, required: true },
            color: { type: String, required: true },
          },
          date: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);
export default Log;
