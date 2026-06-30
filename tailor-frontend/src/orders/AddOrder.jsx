import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { getOrderCustomers, getOrderTailors } from "../Services/orderService";

export default function AddOrder() {
  const [formData, setFormData] = useState({
    orderName: "",
    customerId: "",
    tailorId: "",
    orderDate: "",
    deliveryDate: "",
    totalAmount: "",
  });
  const [customers, setCustomers] = useState([]);
  const [tailors, setTailors] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingTailors, setLoadingTailors] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const res = await getOrderCustomers();
      setCustomers(res.data ?? []);
    } catch {
      setCustomers([]);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const loadTailors = async () => {
    setLoadingTailors(true);
    try {
      const res = await getOrderTailors();
      setTailors(res.data ?? []);
    } catch {
      setTailors([]);
    } finally {
      setLoadingTailors(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    loadTailors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/Orders", {
        orderName: formData.orderName,
        customerID: Number(formData.customerId),
        tailorID: Number(formData.tailorId),
        orderDate: formData.orderDate,
        deliveryDate: formData.deliveryDate,
        totalAmount: Number(formData.totalAmount),
      });
      alert("Order added!");
      setFormData({
        orderName: "",
        customerId: "",
        tailorId: "",
        orderDate: "",
        deliveryDate: "",
        totalAmount: "",
      });
      navigate("/orders");
    } catch {
      alert("Error adding order. Check the backend.");
    }
  };

  return (
    <div>
      <Link to="/orders" className="page-back">← Orders</Link>

      <div className="page-header">
        <h1>Add Order</h1>
        <p>Add a new order to the system</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Order Name</label>
            <input className="form-input" name="orderName" placeholder="Order name" value={formData.orderName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Customer</label>
            <select
              className="form-input"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              disabled={loadingCustomers}
            >
              <option value="">{loadingCustomers ? "Loading customers..." : "Select customer"}</option>
              {customers.map((c) => (
                <option key={c.customerID} value={String(c.customerID)}>
                  {c.customerName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tailor</label>
            <select
              className="form-input"
              name="tailorId"
              value={formData.tailorId}
              onChange={handleChange}
              required
              disabled={loadingTailors}
            >
              <option value="">{loadingTailors ? "Loading tailors..." : "Select tailor"}</option>
              {tailors.map((t) => (
                <option key={t.tailorID} value={String(t.tailorID)}>
                  {t.tailorName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Order Date</label>
            <input className="form-input" name="orderDate" type="date" value={formData.orderDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Date</label>
            <input className="form-input" name="deliveryDate" type="date" value={formData.deliveryDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Total Amount</label>
            <input className="form-input" name="totalAmount" type="number" placeholder="Total Amount" value={formData.totalAmount} onChange={handleChange} required />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/orders" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
