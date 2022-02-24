import express from "express";
import { config } from "dotenv";
import connectDB from "./Services/mongodb/connectDB";
import cors from "cors";
import authRoutes from "./Routes/authRoute";
import categoryRoutes from "./Routes/categoryRoutes";
import productRoutes from "./Routes/productRoute";

// PORT
const PORT = process.env.PORT || "4000";

// Environment variables
config();

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connection with database
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Listen to port
app.listen(PORT, (req, res) => {
  console.log(`Server is up and running on port ${PORT}`);
});
