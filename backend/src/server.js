import express from "express";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = ENV.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});
