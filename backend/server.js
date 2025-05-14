import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import logRoutes from "./routes/log.routes.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();
app.use("/api/user", userRoutes);
app.use("/api/logs", logRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
