import mongoose from "mongoose";
import { ENV } from "../config/env.js";

export const connectDb = async () => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error("ENV.MONGO_URI is not set");
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDb Connected", conn.connection.host);
  } catch (error) {
    console.log("Connection Error", error);
    process.exit(1);
  }
};
