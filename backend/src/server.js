import express from "express";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const _dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  // ✅ Catch-all route for React/Vue/SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server Started");
  connectDb();
});
