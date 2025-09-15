import mongoose from "mongoose";
import { ENV } from "../config/env.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDb Connected", conn.connection.host);
  } catch (error) {
    console.log("Connection Error", error);
    process.exit(1);
  }
};
