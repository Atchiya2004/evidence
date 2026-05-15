import { useNavigate } from "react-router-dom";

function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="navbar">
      <h3 onClick={() => nav("/dashboard")} style={{ cursor: "pointer" }}>
        🔐 Evidence System
      </h3>

      <div>
        <button onClick={() => nav("/cases")}>Cases</button>
        <button onClick={() => nav("/phishing")}>Phishing</button>
        <button onClick={() => nav("/reports")}>Reports</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;