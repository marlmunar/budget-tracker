import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import logRoutes from "./routes/log.routes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use("/api/users/", userRoutes);
app.use("/api/logs", logRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
