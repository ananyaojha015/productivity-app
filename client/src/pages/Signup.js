import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://productivity-app-w6ya.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);
      alert("Signup successful ✅");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-900 to-black">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg w-80 shadow-lg"
      >
        <h2 className="text-2xl mb-4 text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Signup
        </button>

        <p
          className="text-sm mt-3 text-center cursor-pointer text-blue-600"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

export default Signup;