import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMeasurementOrders, getMeasurements, updateMeasurement } from "../Services/measurementService";

export default function EditMeasurement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getOrderId = (o) => o?.orderID ?? o?.OrderID ?? o?.orderId ?? o?.id ?? "";
  const getOrderName = (o) => o?.orderName ?? o?.OrderName ?? "";
  const getOrderCustomerId = (o) => o?.customerID ?? o?.CustomerID ?? o?.customerId ?? "";

  const [formData, setFormData] = useState({
    orderId: "",
    orderName: "",
    customerId: "",
    chest: "",
    waist: "",
    length: "",
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadMeasurement = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await getMeasurements();
      const measurement = (res.data ?? []).find((m) => {
        const measurementId = m.measurementID ?? m.MeasurementID ?? m.id;
        return Number(measurementId) === Number(id);
      });

      if (!measurement) {
        setNotFound(true);
        return;
      }

      setFormData({
        orderId: String(measurement.orderID ?? measurement.OrderID ?? ""),
        orderName: "",
        customerId: String(measurement.customerID ?? measurement.CustomerID ?? ""),
        chest: String(measurement.chest ?? ""),
        waist: String(measurement.waist ?? ""),
        length: String(measurement.length ?? ""),
      });
    } catch {
      alert("Could not load measurement.");
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await getMeasurementOrders();
      setOrders(res.data ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadMeasurement();
    loadOrders();
  }, [id]);

  useEffect(() => {
    const selected = orders.find((o) => String(getOrderId(o)) === String(formData.orderId));
    if (!selected) return;
    setFormData((prev) => ({ ...prev, orderName: getOrderName(selected) }));
  }, [orders, formData.orderId]);

  const handleOrderSelect = (e) => {
    const selectedOrderId = e.target.value;
    const selected = orders.find((o) => String(getOrderId(o)) === String(selectedOrderId));

    setFormData((prev) => ({
      ...prev,
      orderId: selectedOrderId,
      customerId: selected ? String(getOrderCustomerId(selected)) : prev.customerId,
      orderName: selected ? getOrderName(selected) : prev.orderName,
    }));
  };

  const update = async (e) => {
    e.preventDefault();

    const data = {
      orderID: Number(formData.orderId),
      chest: Number(formData.chest),
      waist: Number(formData.waist),
      length: Number(formData.length),
    };

    try {
      await updateMeasurement({ ...data, measurementID: Number(id) });
      alert("Updated successfully!");
      navigate("/measurements");
    } catch {
      alert("Error updating measurement.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notFound) {
    return (
      <div>
        <Link to="/measurements" className="page-back">← Measurements</Link>
        <div className="card" style={{ maxWidth: "500px" }}>
          <p>Measurement #{id} not found.</p>
          <Link to="/measurements" className="btn btn-outline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/measurements" className="page-back">← Measurements</Link>

      <div className="page-header">
        <h1>Edit Measurement</h1>
        <p>Update measurement #{id} {formData.orderName}</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={update}>
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
                .filter((o) => Boolean(getOrderName(o)))
                .map((o) => (
                  <option key={String(getOrderId(o))} value={String(getOrderId(o))}>
                    {getOrderName(o)}
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

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn-primary">Update</button>
            <Link to="/measurements" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}