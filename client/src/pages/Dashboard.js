import { useState, useEffect, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState(new Date());

  const name = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  // ✅ FIXED: stable function (no warning)
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });

      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  }, [token]);

  // ✅ CLEAN useEffect
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refresh]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-pink-300">
            Hi, {name || "User"} 👋
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded-lg hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        {/* TASK FORM */}
        <TaskForm setRefresh={setRefresh} />

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 📅 CALENDAR */}
          <div className="glass p-4 shadow-lg">
            <Calendar
              onChange={setDate}
              value={date}

              // ✅ HIGHLIGHT DATES WITH TASKS
              tileClassName={({ date }) => {
                const hasTask = tasks.some(task => {
                  const d = new Date(task.dueDate);

                  return (
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
                  );
                });

                return hasTask ? "highlight" : null;
              }}
            />
          </div>

          {/* 📋 TASK LIST */}
          <div className="glass p-4 max-h-[450px] overflow-y-auto">
            <TaskList
              tasks={tasks}
              setRefresh={setRefresh}
              selectedDate={date}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;