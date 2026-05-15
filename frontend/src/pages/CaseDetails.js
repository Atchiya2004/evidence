import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { isAdmin } from "../utils/auth";

function CaseDetails() {
  const { id } = useParams();

  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔽 Load evidence
  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/evidence/case/${id}`);
        setEvidence(res.data);
      } catch (err) {
        console.error("Error loading evidence:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // 🔒 Close case
  const closeCase = async () => {
    if (!window.confirm("Are you sure you want to close this case?")) return;

    try {
      await API.put(`/case/close/${id}`);
      alert("Case closed successfully");
      window.location.reload();
    } catch (err) {
      alert("Failed to close case");
      console.error(err);
    }
  };

  // 🎯 format status → css-safe
  const formatStatus = (status) => {
    if (!status) return "not-verified";
    return status.toLowerCase().replace(" ", "-");
  };

  return (
    <div className="case-page">
      
      {/* 🔷 HEADER */}
      <div className="case-header">
        <h2>📁 Evidence</h2>

        {isAdmin() && (
          <button onClick={closeCase} className="close-btn">
            🔒 Close Case
          </button>
        )}
      </div>

      {/* ⏳ Loading */}
      {loading && <p>Loading...</p>}

      {/* 📂 No data */}
      {!loading && evidence.length === 0 && (
        <p className="empty">No evidence found</p>
      )}

      {/* 📄 Evidence list */}
      <div className="evidence-grid">
        {evidence.map((e) => (
          <div key={e._id || e.id} className="card">
            <h3>{e.fileName}</h3>

            <p><b>ID:</b> {e.id}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${formatStatus(e.status)}`}>
                {e.status || "NOT VERIFIED"}
              </span>
            </p>

            <p>
              <b>Uploaded:</b> {e.uploadedAt}
            </p>

            {/* 📂 File view */}
            <a
              href={`http://localhost:5000/uploads/${e.fileName}`}
              target="_blank"
              rel="noreferrer"
            >
              📂 View / Download
            </a>

            <br />

            {/* 🔗 Blockchain */}
            {e.txHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${e.txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                🔗 Blockchain Proof
              </a>
            )}<br />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseDetails;