import { useState } from "react";
import axios from "axios";

function TaskForm({ setRefresh }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, priority, dueDate, time },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setRefresh(prev => !prev);
  };

  return (
    <div className="glass p-5 mb-6">

      <input
        placeholder="✨ Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-3 rounded bg-transparent border border-white/20"
      />

      <div className="flex gap-2 mb-3">
        <select onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-transparent border border-white/20">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date"
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 rounded border bg-transparent" />

        <input type="time"
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded border bg-transparent" />
      </div>

      <button onClick={handleAdd} className="btn-primary w-full">
        Add Task
      </button>

    </div>
  );
}

export default TaskForm;