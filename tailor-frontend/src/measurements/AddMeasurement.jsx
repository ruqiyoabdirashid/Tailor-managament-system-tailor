import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";

export default function AddMeasurement() {
  const [formData, setFormData] = useState({
    orderId: "",
    chest: "",
    waist: "",
    length: "",
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSelect = (e) => {
    const selectedOrderId = e.target.value;
    setFormData((prev) => ({ ...prev, orderId: selectedOrderId }));
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await api.get("/Measurements/orders");
      setOrders(res.data ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/Measurements", {
        orderID: Number(formData.orderId),
        chest: Number(formData.chest),
        waist: Number(formData.waist),
        length: Number(formData.length),
      });
      alert("Measurement added!");
      setFormData({ orderId: "", chest: "", waist: "", length: "" });
      navigate("/measurements");
    } catch {
      alert("Error adding measurement.");
    }
  };

  return (
    <div>
      <Link to="/measurements" className="page-back">← Measurements</Link>

      <div className="page-header">
        <h1>Add Measurement</h1>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Order</label>
            <select
              className="form-input"
              name="orderId"
              value={formData.orderId}
              onChange={handleOrderSelect}
              required
              disabled={loadingOrders}
            >
              <option value="">{loadingOrders ? "Loading orders..." : "Select order"}</option>
              {orders
                .filter((o) => o?.orderName)
                .map((o) => (
                  <option key={o.orderID} value={String(o.orderID)}>
                    {o.orderName}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Chest</label>
            <input className="form-input" name="chest" placeholder="Chest" value={formData.chest} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Waist</label>
            <input className="form-input" name="waist" placeholder="Waist" value={formData.waist} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Length</label>
            <input className="form-input" name="length" placeholder="Length" value={formData.length} onChange={handleChange} />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/measurements" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
