import express from "express";
import {
  getLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
  downloadLog,
} from "../controllers/log.controller.js";
import validateId from "../middlewares/validateId.middleware.js";

const router = express.Router();

router.route("/").get(getLogs).post(createLog);
router
  .route("/:id")
  .get(validateId, getLog)
  .put(validateId, updateLog)
  .delete(validateId, deleteLog)
  .download(validateId, downloadLog);

export default router;
