import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import logRoutes from "./routes/log.routes.js";
import {
  errorHandler,
  notFound,
} from "./middlewares/errorHandler.middleware.js";
import protect from "./middlewares/authenticate.middleware.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/logs", protect, logRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
