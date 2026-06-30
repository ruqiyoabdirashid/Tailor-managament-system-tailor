import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteMeasurement, getMeasurements } from "../Services/measurementService";

export default function MeasurementList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getMeasurements();
      setData(res.data);
    } catch {
      setData([]);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteMeasurement(id);
    load();
  };

  return (
    <div>
      <Link to="/dashboard" className="page-back">← Dashboard</Link>

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Measurements</h1>
          <p>All measurements in the system</p>
        </div>
        <Link to="/measurements/add" className="btn btn-primary">+ Add Measurement</Link>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Measurement ID</th>
              <th>Order</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Length</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
                  No measurements yet
                </td>
              </tr>
            ) : (
              data.map((m) => {
                const measurementId = m.measurementID;

                return (
                  <tr key={measurementId}>
                    <td>{measurementId}</td>
                    <td>{m.orderName}</td>
                    <td>{m.chest}</td>
                    <td>{m.waist}</td>
                    <td>{m.length}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/measurements/edit/${measurementId}`)}
                          className="btn btn-outline"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(measurementId)}
                          className="btn btn-danger"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
