const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  priority: String,
  dueDate: Date,
  time: String, // ✅ ADD THIS
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);