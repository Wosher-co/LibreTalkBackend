import { EndpointManager } from "./endpoints/manager";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/test",
  {},
  () => console.log("Connected to MongoDB")
);
const manager = new EndpointManager();
