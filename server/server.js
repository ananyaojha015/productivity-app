require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authMiddleware = require("./middleware/authMiddleware");

const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected data accessed", user: req.user });
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});