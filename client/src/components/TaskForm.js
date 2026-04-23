import { useState } from "react";
import axios from "axios";

function TaskForm({ setRefresh }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://productivity-app-w6ya.onrender.com/api/tasks",
      {
        title,
        priority,
        dueDate,
        time
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // ✅ FIXED
        }
      }
    );

    console.log("Task added:", res.data);

    setTitle("");
    setPriority("low");
    setDueDate("");
    setTime("");

    setRefresh(prev => !prev);

  } catch (err) {
    console.log("Add task error:", err.response?.data || err.message);
    alert("Task failed ❌");
  }
};

  return (
    <div className="glass p-5 mb-6">

      <input
        placeholder="✨ Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-3 rounded bg-transparent border border-white/20 text-white"
      />

      <div className="flex gap-2 mb-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-transparent border border-white/20 text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 rounded border bg-transparent text-white"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded border bg-transparent text-white"
        />
      </div>

      <button
        onClick={handleAdd}
        className="btn-primary w-full"
      >
        Add Task
      </button>

    </div>
  );
}

export default TaskForm;