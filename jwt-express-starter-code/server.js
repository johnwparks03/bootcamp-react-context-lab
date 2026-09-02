const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Import routers
const authRouter = require("./routes/api/users");
const userRouter = require("./controllers/users");

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Missing MONGODB_URI in .env.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
