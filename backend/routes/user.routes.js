import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {});
router.post("/login", (req, res) => {});
router
  .route("/profile/:id")
  .get((req, res) => {})
  .put((req, res) => {});

export default router;
