const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
// ➕ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
    try {
        const task = new Task({
            user: req.user.id,
            title: req.body.title,
            priority: req.body.priority,
            dueDate: req.body.dueDate
        });

        await task.save();
        res.json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 📄 GET TASKS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { status } = req.query;

        let filter = { user: req.user.id };

        if (status === "completed") {
            filter.completed = true;
        } else if (status === "pending") {
            filter.completed = false;
        }

        const tasks = await Task.find(filter);
        res.json(tasks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// ✏️ UPDATE TASK (mark complete/incomplete)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );

        res.json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// ❌ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;