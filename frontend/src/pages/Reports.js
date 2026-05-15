import { useEffect, useState } from "react";
import API from "../api/axios";

function Reports() {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  // Load all cases
  useEffect(() => {
    API.get("/case/all")
      .then(res => setCases(res.data))
      .catch(err => console.error(err));
  }, []);

  // Generate report
  const generateReport = async () => {
    if (!caseId) {
      return alert("Select a case");
    }

    try {
      const res = await API.get(
        `/report/case/${caseId}`,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: "application/pdf"
        })
      );

      setReportUrl(url);

    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    }
  };

  return (
    <div className="report-page">

      <h2>📄 Generate Forensic Report</h2>

      {/* CASE SELECT */}
      <select
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
      >
        <option value="">Select Case</option>

        {cases.map(c => (
          <option key={c._id} value={c._id}>
            {c.title} ({c.status})
          </option>
        ))}
      </select>

      {/* GENERATE */}
      <button onClick={generateReport}>
        Generate Report
      </button>

      {/* PDF VIEW */}
      {reportUrl && (
        <div style={{ marginTop: "25px" }}>

          <iframe
            src={reportUrl}
            title="PDF Report"
            width="100%"
            height="500px"
            style={{
              border: "1px solid #334155",
              borderRadius: "10px"
            }}
          />

          <br />

          <a
            href={reportUrl}
            download={`case-${caseId}.pdf`}
          >
            <button style={{ marginTop: "15px" }}>
              ⬇ Download Report
            </button>
          </a>

        </div>
      )}

    </div>
  );
}

export default Reports;