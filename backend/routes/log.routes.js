import express from "express";
import {
  getLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
  downloadLog,
  importLog,
} from "../controllers/log.controller.js";
import validateId from "../middlewares/validateId.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error("Only .xlsx files are allowed!"), false);
    }
    cb(null, true);
  },
});

router.route("/").get(getLogs).post(createLog);
router.get("/download/:id", validateId, downloadLog);
router.post("/import", upload.single("file"), importLog);
router
  .route("/:id")
  .get(validateId, getLog)
  .put(validateId, updateLog)
  .delete(validateId, deleteLog);

export default router;
