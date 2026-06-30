import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCustomer } from "../Services/customerService";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCustomer({
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      alert("Customer added!");
      setFormData({ name: "", phone: "", address: "" });
      navigate("/customers");
    } catch {
      alert("Error saving. Check the backend.");
    }
  };

  return (
    <div>
      <Link to="/customers" className="page-back">← Customers</Link>

      <div className="page-header">
        <h1>Add Customer</h1>
        <p>Add a new customer to the system</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              name="name"
              placeholder="Customer name"
              value={formData.name}
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
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              className="form-input"
              name="address"
              placeholder="Mogadishu"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/customers" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
