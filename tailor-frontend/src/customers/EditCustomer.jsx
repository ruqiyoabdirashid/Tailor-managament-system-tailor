import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCustomers, updateCustomer } from "../Services/customerService";



export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadCustomer = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await getCustomers();
      const customer = (res.data ?? []).find((c) => {
        const customerId = c.customerID ?? c.CustomerID ?? c.id;
        return Number(customerId) === Number(id);
      });

      if (customer) {
        setFormData({
          name: customer.customerName ?? customer.CustomerName ?? "",
          phone: customer.phone ?? customer.Phone ?? "",
          address: customer.address ?? customer.Address ?? "",
        });
      } else {
        setNotFound(true);
      }
    } catch {
      alert("Could not load customer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, [id]);

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateCustomer({
        customerID: Number(id),
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      alert("Updated successfully!");
      navigate("/customers");
    } catch {
      alert("Error updating customer. Check the backend.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notFound) {
    return (
      <div>
        <Link to="/customers" className="page-back">← Customers</Link>
        <div className="card" style={{ maxWidth: "500px" }}>
          <p>Customer #{id} not found.</p>
          <Link to="/customers" className="btn btn-outline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/customers" className="page-back">← Customers</Link>

      <div className="page-header">
        <h1>Edit Customer</h1>
        <p>Update customer #{id}</p>
      </div>

      <div className="card" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleUpdate}>
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
            <button type="submit" className="btn btn-primary">Update</button>
            <Link to="/customers" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
