import { useEffect, useState } from "react";
import API from "../api/axios";

function VerifyEvidence() {

  const [file, setFile] = useState(null);

  const [evidenceId, setEvidenceId] = useState("");

  const [evidenceList, setEvidenceList] = useState([]);

  // ✅ load evidence
  useEffect(() => {

    API.get("/evidence/all")
      .then(res => setEvidenceList(res.data))
      .catch(err => console.error(err));

  }, []);

  const verify = async () => {

    if (!file || !evidenceId) {
      return alert(
        "Select evidence and upload file"
      );
    }

    try {

      const form = new FormData();

      form.append("file", file);

      form.append(
        "evidenceId",
        evidenceId
      );

      const res = await API.post(
        "/evidence/verify",
        form
      );

      alert(
        "Verification Result: " +
        res.data.status
      );

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        "Verification failed"
      );
    }
  };

  return (
    <div className="container">

      <h2>Verify Evidence</h2>

      {/* ✅ evidence dropdown */}
      <select
        value={evidenceId}
        onChange={(e) =>
          setEvidenceId(e.target.value)
        }
      >

        <option value="">
          Select Evidence
        </option>

        {evidenceList.map(e => (

          <option
            key={e._id}
            value={e._id}
          >
            {e.fileName}
          </option>

        ))}

      </select>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={verify}>
        Verify
      </button>

    </div>
  );
}

export default VerifyEvidence;