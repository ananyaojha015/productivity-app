import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ STORE USER NAME (IMPORTANT)
      localStorage.setItem("userName", res.data.user?.name || "User");

      // 👉 go to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert("Login failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a1f2f] via-[#3a2a3f] to-black">

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-80 text-white">

        <h2 className="text-2xl mb-4 text-center text-pink-300">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-transparent border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-transparent border"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-300">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;