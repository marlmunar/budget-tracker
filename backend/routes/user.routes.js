import express from "express";

const router = express.Router();

router.post("/register", () => {});
router.post("/login", () => {});
router
  .route("/profile/:id")
  .get(() => {})
  .put(() => {});
