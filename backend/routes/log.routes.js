import express from "express";
import {
  getLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
} from "../controllers/log.controller.js";

const router = express.Router();

router.route("/").get(getLogs).post(createLog);
router.route("/:id").get(getLog).put(updateLog).delete(deleteLog);

export default router;
