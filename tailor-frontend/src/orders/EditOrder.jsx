import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderCustomers, getOrderTailors, getOrders, updateOrder } from "../Services/orderService";

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toDateInput = (value) => {
    if (!value) return "";
    const s = String(value);
    return s.length >= 10 ? s.slice(0, 10) : s;
  };

  const loadOrder = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await getOrders();
      const order = (res.data ?? []).find((o) => {
        const orderId = o.orderID ?? o.OrderID ?? o.orderId ?? o.id;
        return Number(orderId) === Number(id);
      });

      if (!order) {
        setNotFound(true);
        return;
      }

      setFormData({
        orderName: String(
          order.orderName 
        ),
        customerId: String(order.customerID ?? order.CustomerID ?? ""),
        tailorId: String(order.tailorID ?? order.TailorID ?? ""),
        orderDate: toDateInput(order.orderDate),
        deliveryDate: toDateInput(order.deliveryDate),
        totalAmount: String(order.totalAmount ),
      });
    } catch {
      alert("Could not load order.");
    } finally {
      setLoading(false);
    }
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
    loadOrder();
    loadCustomers();
    loadTailors();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      orderID: Number(id),
      orderName: formData.orderName,
      customerID: Number(formData.customerId),
      tailorID: Number(formData.tailorId),
      orderDate: formData.orderDate,
      deliveryDate: formData.deliveryDate,
      totalAmount: Number(formData.totalAmount),
    };

    try {
      await updateOrder(updatedOrder);
      alert("Updated successfully!");
      navigate("/orders");
    } catch {
      alert("Error updating order");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notFound) {
    return (
      <div>
        <Link to="/orders" className="page-back">← Orders</Link>
        <div className="card" style={{ maxWidth: "500px" }}>
          <p>Order #{id} not found.</p>
          <Link to="/orders" className="btn btn-outline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/orders" className="page-back">← Orders</Link>

      <div className="page-header">
        <h1>Edit Order</h1>
        <p>Update order #{id} {formData.orderName}</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleUpdate}>
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
            <button type="submit" className="btn btn-primary">Update</button>
            <Link to="/orders" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}