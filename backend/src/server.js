import express from "express";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { connectDb } from "./lib/db.js";

const app = express();
const _dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

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
