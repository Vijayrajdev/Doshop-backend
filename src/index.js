import express from "express";

// Initialize express
const app = express();

// Listen to port
const PORT = "3000";
app.listen(PORT, (req, res) => {
  console.log(`Server is up and running on port ${PORT}`);
});
