import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function CaseList() {

  const [cases, setCases] = useState([]);

  const nav = useNavigate();

  useEffect(() => {

    API.get("/case/all")
      .then(res => setCases(res.data))
      .catch(err => console.error(err));

  }, []);

  return (
    <div className="case-page">

      <div className="case-header">
        <h2>📂 Cases</h2>
      </div>

      <div className="evidence-grid">

        {cases.map(c => (

          <div
            key={c._id}
            className="card"
            onClick={() => nav(`/case/${c._id}`)}
          >

            <h3>{c.title}</h3>

            <p>
              <b>Status:</b> {c.status}
            </p>

            <p>
              <b>Crime Type:</b>
              {" "}
              {c.crimeType || "N/A"}
            </p>

            <p>
              <b>ID:</b>
              {" "}
              {c._id}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}

export default CaseList;