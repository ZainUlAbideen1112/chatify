import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(400).json({ messgae: "UnAuthorized Token" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) return res.status(400).json({ messgae: "Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(400).json({ messgae: "No user exists" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protected route", error);
    res.status(401).json({ messgae: "Error in protected route" });
  }
};
