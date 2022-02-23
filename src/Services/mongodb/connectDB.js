import mongoose from "mongoose";

const connectDB = async () => {
  const connectionString = process.env.DB_URL;
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to Database!");
  } catch (error) {
    console.log(`Couldn't connect to Database: ${error.message}`);
  }
};

export default connectDB;
