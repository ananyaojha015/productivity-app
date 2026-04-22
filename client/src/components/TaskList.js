import axios from "axios";

function TaskList({ tasks, setRefresh, selectedDate }) {

  const token = localStorage.getItem("token");

  // ✅ FILTER TASKS BY SELECTED DATE (FIXED)
  const filtered = tasks.filter(task => {
    const d = new Date(task.dueDate);

    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  });

  // ✅ SPLIT INTO PENDING + COMPLETED
  const pending = filtered.filter(task => !task.completed);
  const completed = filtered.filter(task => task.completed);

  // ✅ TOGGLE COMPLETE
  const toggleComplete = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { completed: !status },
      { headers: { Authorization: token } }
    );

    setRefresh(prev => !prev);
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers: { Authorization: token } }
    );

    setRefresh(prev => !prev);
  };

  return (
    <div>

      {/* 🔴 PENDING */}
      <h2 className="text-pink-300 mb-2 text-lg">Pending</h2>

      {pending.length === 0 && (
        <p className="text-gray-400 text-sm mb-3">
          No tasks for this date
        </p>
      )}

      {pending.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}

      {/* 🟢 COMPLETED */}
      <h2 className="text-green-300 mt-4 mb-2 text-lg">Completed</h2>

      {completed.length === 0 && (
        <p className="text-gray-400 text-sm">
          No completed tasks
        </p>
      )}

      {completed.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}

    </div>
  );
}


// 🎯 TASK CARD COMPONENT
function TaskCard({ task, toggleComplete, deleteTask }) {
  return (
    <div className="glass p-3 mb-3 flex justify-between items-center shadow-md">

      <div>
        <p className="text-lg">{task.title}</p>

        <p className="text-sm text-pink-200">
          {task.dueDate?.slice(0, 10)} • {task.time || "--:--"}
        </p>
      </div>

      <div className="flex gap-2">

        {/* COMPLETE BUTTON */}
        <button
          onClick={() => toggleComplete(task._id, task.completed)}
          className="bg-green-500 px-2 rounded hover:scale-105 transition"
        >
          ✔
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 px-2 rounded hover:scale-105 transition"
        >
          ✕
        </button>

      </div>

    </div>
  );
}

export default TaskList;