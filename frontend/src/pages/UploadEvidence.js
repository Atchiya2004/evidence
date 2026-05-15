import { useEffect, useState } from "react";
import API from "../api/axios";

function UploadEvidence() {

  const [file, setFile] = useState(null);

  const [caseId, setCaseId] = useState("");

  const [cases, setCases] = useState([]);

  useEffect(() => {

    API.get("/case/all")
      .then(res => {

        // ✅ only open cases
        const openCases = res.data.filter(
          c => c.status === "Open"
        );

        setCases(openCases);

      })
      .catch(err => console.error(err));

  }, []);

  const upload = async () => {

    if (!file || !caseId) {
      return alert("Select case and file");
    }

    try {

      const form = new FormData();

      form.append("file", file);

      form.append("caseId", caseId);

      const res = await API.post(
        "/evidence/upload",
        form
      );

      alert(`Uploaded Successfully

TX: ${res.data.txHash}

Block: ${res.data.blockNumber}`);

      setFile(null);

      setCaseId("");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        "Upload failed"
      );
    }
  };

  return (
    <div className="container">

      <h2>Upload Evidence</h2>

      <select
        value={caseId}
        onChange={(e) =>
          setCaseId(e.target.value)
        }
      >

        <option value="">
          Select Open Case
        </option>

        {cases.map(c => (

          <option
            key={c._id}
            value={c._id}
          >
            {c.title}
          </option>

        ))}

      </select>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={upload}>
        Upload
      </button>

    </div>
  );
}

export default UploadEvidence;