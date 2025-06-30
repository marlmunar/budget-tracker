import express from "express";
import {
  verifyEmail,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import protect from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/verify", verifyEmail);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default router;
