import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Connect to Database & Start Server
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
