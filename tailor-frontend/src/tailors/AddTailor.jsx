import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTailor } from "../Services/tailorService";

export default function AddTailor() {
  const [formData, setFormData] = useState({
    tailorName: "",
    phone: "",
    specialty: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      await createTailor({
        tailorID: 0,
        tailorName: formData.tailorName,
        phone: formData.phone,
        specialty: formData.specialty,
      });
      alert("Tailor added!");
      setFormData({ tailorName: "", phone: "", specialty: "" });
      navigate("/tailors");
    } catch {
      alert("Error saving. Check the backend.");
    }
  };

  return (
    <div>
      <Link to="/tailors" className="page-back">← Tailors</Link>

      <div className="page-header">
        <h1>Add Tailor</h1>
        <p>Add a new tailor to the system</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={save}>
          <div className="form-group">
            <label className="form-label">Tailor Name</label>
            <input
              className="form-input"
              name="tailorName"
              placeholder="Tailor name"
              value={formData.tailorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              name="phone"
              placeholder="061xxxxxxx"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Specialty</label>
            <input
              className="form-input"
              name="specialty"
              placeholder="e.g. Suits"
              value={formData.specialty}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/tailors" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
