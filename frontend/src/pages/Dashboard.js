import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { isAdmin, isCID } from "../utils/auth";

function Dashboard() {
  const nav = useNavigate();

  const [stats, setStats] = useState({
    cases: 0,
    evidence: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    async function load() {
      try {
        const [casesRes, evidenceRes] = await Promise.all([
          API.get("/case/all"),
          API.get("/evidence/all")
        ]);

        setStats({
          cases: casesRes.data.length,
          evidence: evidenceRes.data.length
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [nav]);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <h1>🚔 Digital Evidence Dashboard</h1>

      <div className="dashboard-grid">

        {/* 📁 CASES */}
        <div
          className="dashboard-card"
          onClick={() => nav("/cases")}
        >
          <h2>📁 View Cases</h2>

          <p>Total Registered Cases</p>

          <h1>{stats.cases}</h1>
        </div>

        {/* 📂 EVIDENCE */}
        <div className="dashboard-card">
          <h2>📂 Evidences</h2>

          <p>Total Uploaded Evidence</p>

          <h1>{stats.evidence}</h1>
        </div>

        {/* ➕ CREATE CASE */}
        {isAdmin() && (
          <div
            className="dashboard-card"
            onClick={() => nav("/create-case")}
          >
            <h2>➕ Create Case</h2>

            <p>Create new investigation case</p>
          </div>
        )}

        {/* ⬆ UPLOAD */}
        {isCID() && (
          <div
            className="dashboard-card"
            onClick={() => nav("/upload")}
          >
            <h2>⬆ Upload Evidence</h2>

            <p>Add forensic evidence securely</p>
          </div>
        )}

        {/* ✅ VERIFY */}
        {isCID() && (
          <div
            className="dashboard-card"
            onClick={() => nav("/verify")}
          >
            <h2>✅ Verify Evidence</h2>

            <p>Check blockchain integrity</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;