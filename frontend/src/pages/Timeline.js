import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";

function Timeline() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get(`/evidence/timeline/${id}`)
      .then(res => setLogs(res.data));
  }, [id]);

  return (
    <div>
      <h2>Timeline</h2>

      {logs.map((l, i) => (
        <div key={i} className="card">
          {l.action} - {new Date(l.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default Timeline;