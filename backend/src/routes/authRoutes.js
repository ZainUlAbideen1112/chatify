import express from "express";
import {
  signUp,
  logIn,
  logOut,
  updateProfile,
} from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);

export default router;
