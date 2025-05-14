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
          color: { type: String },
        },
      ],
      validate: {
        validator: function (categories) {
          const names = categories.map((c) => c.name.toLowerCase());
          return names.length === new Set(names).size;
        },
        message: "Category names must be unique.",
      },
    },
    entries: [
      {
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        note: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Log = mongoose.model("Log", logSchema);
export default Log;
