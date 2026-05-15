import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      return setMsg("Enter email and password");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ small delay avoids token race condition
      setTimeout(() => {
        nav("/dashboard");
      }, 100);

    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {msg && <p className="error">{msg}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;