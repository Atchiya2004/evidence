import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>🔐 Digital Evidence System</h1>
        <p>Blockchain-secured forensic evidence management</p>

        <div className="home-buttons">
          <button onClick={() => nav("/login")}>Login</button>
          <button onClick={() => nav("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Home;