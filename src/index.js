import express from "express";
import { config } from "dotenv";
import connectDB from "./Services/mongodb/connectDB";
import cors from "cors";
import authRoutes from "./Routes/authRoute";
import categoryRoutes from "./Routes/categoryRoutes";
import productRoutes from "./Routes/productRoute";

// Environment variables
config();

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connection with database
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Listen to port
const PORT = process.env.PORT || "4000";
app.listen(PORT, (req, res) => {
  console.log(`Server is up and running on port ${PORT}`);
});
