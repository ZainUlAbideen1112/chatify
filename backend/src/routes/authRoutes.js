import express from "express";
import { signUp, logIn, logOut } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signUp);

router.get("/login", logIn);

router.get("/logout", logOut);

export default router;
