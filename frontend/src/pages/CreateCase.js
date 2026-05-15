import { useState } from "react";
import API from "../api/axios";

function CreateCase() {
  const [form, setForm] = useState({
    title: "",
    crimeType: "",
    location: "",
    description: ""
  });

  const create = async () => {
    if (!form.title || !form.crimeType) {
      return alert("Enter required fields");
    }

    try {
      await API.post("/case/create", form);

      alert("Case created successfully");

      setForm({
        title: "",
        crimeType: "",
        location: "",
        description: ""
      });

    } catch (err) {
      alert("Failed to create case");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Create Case</h2>

      <input
        placeholder="Case Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Crime Type"
        value={form.crimeType}
        onChange={(e) =>
          setForm({ ...form, crimeType: e.target.value })
        }
      />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <textarea
        placeholder="Case Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button onClick={create}>
        Create Case
      </button>
    </div>
  );
}

export default CreateCase;