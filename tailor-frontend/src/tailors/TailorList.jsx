import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTailors, deleteTailor } from "../Services/tailorService";

export default function TailorList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getTailors();
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteTailor(id);
    load();
  };

  return (
    <div>
      <Link to="/dashboard" className="page-back">← Dashboard</Link>

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Tailors</h1>
          <p>All tailors in the system</p>
        </div>
        <Link to="/tailors/add" className="btn btn-primary">+ Add Tailor</Link>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
                  No tailors yet
                </td>
              </tr>
            ) : (
              data.map((t) => (
                <tr key={t.tailorID}>
                  <td>{t.tailorName}</td>
                  <td>{t.phone}</td>
                  <td>{t.specialty}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => navigate(`/tailors/edit/${t.tailorID}`)}
                        className="btn btn-outline"
                        style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                      >
                        Update
                      </button>
                      <button onClick={() => remove(t.tailorID)} className="btn btn-danger" style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
