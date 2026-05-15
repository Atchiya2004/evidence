import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [msg, setMsg] = useState("");

  const register = async () => {
    try {
      const res = await API.post("/auth/register", form);
      setMsg(res.data.message);

      setTimeout(() => nav("/login"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {msg && <p>{msg}</p>}

      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="cid">CID</option>
        <option value="lawyer">Lawyer</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;