import { useState } from "react";
import API from "../api/axios";

function Phishing() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!text.trim()) {
      alert("Enter email content");
      return;
    }

    try {
      const res = await API.post("/phishing", {
        content: text
      });

      setResult(res.data);
    } catch (err) {
      alert("Analysis failed");
    }
  };

  return (
    <div className="phishing-page">
      <h2>📧 Phishing Email Analyzer</h2>

      <textarea
        placeholder="Paste suspicious email content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyze}>Analyze</button>

      {result && (
        <div className={`result ${result.risk.toLowerCase()}`}>
          <p><b>Score:</b> {result.score}</p>
          <p><b>Risk Level:</b> {result.risk}</p>
        </div>
      )}
    </div>
  );
}

export default Phishing;