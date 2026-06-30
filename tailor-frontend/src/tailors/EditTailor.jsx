import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";
import { getTailors, updateTailor } from "../Services/tailorService";

export default function EditTailor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tailorName: "",
    phone: "",
    specialty: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadTailor = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      let t = null;

      // Prefer GET /Tailors/:id if available
      try {
        const res = await api.get(`/Tailors/${id}`);
        t = res.data;
      } catch {
        // Fallback: load list then find
        const res = await getTailors();
        t = (res.data ?? []).find((x) => {
          const tailorId = x.tailorID ?? x.TailorID ?? x.id;
          return Number(tailorId) === Number(id);
        });
      }

      if (!t) {
        setNotFound(true);
        return;
      }

      setFormData({
        tailorName: String(t.tailorName ?? t.TailorName ?? ""),
        phone: String(t.phone ?? t.Phone ?? ""),
        specialty: String(t.specialty ?? t.Specialty ?? ""),
      });
    } catch {
      alert("Could not load tailor.");
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTailor();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      tailorID: Number(id),
      tailorName: formData.tailorName,
      phone: formData.phone,
      specialty: formData.specialty,
    };

    try {
      await updateTailor(id, data);
      alert("Updated successfully!");
      navigate("/tailors");
    } catch {
      alert("Error updating tailor. Check the backend.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (notFound) {
    return (
      <div>
        <Link to="/tailors" className="page-back">← Tailors</Link>
        <div className="card" style={{ maxWidth: "500px" }}>
          <p>Tailor #{id} not found.</p>
          <Link to="/tailors" className="btn btn-outline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/tailors" className="page-back">← Tailors</Link>

      <div className="page-header">
        <h1>Edit Tailor</h1>
        <p>Update tailor #{id}</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleUpdate}>
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
            <button type="submit" className="btn btn-primary">Update</button>
            <Link to="/tailors" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}