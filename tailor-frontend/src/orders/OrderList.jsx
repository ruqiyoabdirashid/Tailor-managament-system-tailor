import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOrder, getOrders } from "../Services/orderService";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const toDate = (v) => (v ? String(v).slice(0, 10) : "");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch {
      setOrders([]);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteOrder(id);
    loadOrders();
  };

  return (
    <div>
      <Link to="/dashboard" className="page-back">← Dashboard</Link>

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Orders</h1>
          <p>All orders in the system</p>
        </div>
        <Link to="/orders/add" className="btn btn-primary">+ Add Order</Link>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Customer</th>
              <th>Tailor</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const orderId = o.orderID;

                return (
                  <tr key={orderId}>
                    <td>{o.orderName}</td>
                    <td>{o.customerName}</td>
                    <td>{o.tailorName}</td>
                    <td>{toDate(o.orderDate)}</td>
                    <td>{toDate(o.deliveryDate)}</td>
                    <td>{o.totalAmount}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/orders/edit/${orderId}`)}
                          className="btn btn-outline"
                          style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(orderId)}
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
