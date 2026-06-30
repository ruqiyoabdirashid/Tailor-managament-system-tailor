import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";

export default function Report() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cus, ord, meas] = await Promise.all([
        api.get("/Customers"),
        api.get("/Orders"),
        api.get("/Measurements/Get_Measurements"),
      ]);
      setCustomers(cus.data);
      setOrders(ord.data);
      setMeasurements(meas.data);
    } catch {
      setCustomers([]);
      setOrders([]);
      setMeasurements([]);
    }
  };

  return (
    <div>
      <Link to="/dashboard" className="page-back">← Dashboard</Link>

      <div className="page-header">
        <h1>Reports</h1>
        <p>System overview</p>
      </div>
      <div className="grid-3" style={{ marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info"><h3>{customers.length}</h3><p>Customers</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">📦</div>
          <div className="stat-info"><h3>{orders.length}</h3><p>Orders</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📏</div>
          <div className="stat-info"><h3>{measurements.length}</h3><p>Measurements</p></div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ margin: "0 0 1rem", color: "#1a2b4a" }}>Recent Orders</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: "center", color: "#718096", padding: "1.5rem" }}>No orders yet</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.orderID}>
                  <td>{o.orderID}</td>
                  <td>{o.customerID}</td>
                  <td>{o.totalAmount}</td>
                  <td>{o.orderDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>    </div>
  );
}