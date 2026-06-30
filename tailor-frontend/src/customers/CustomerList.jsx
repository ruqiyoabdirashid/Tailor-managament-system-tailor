import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../Services/customerService";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch {
      setCustomers([]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    await deleteCustomer(id);
    loadData();
  };

  return (
    <div>
      <Link to="/dashboard" className="page-back">← Dashboard</Link>

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Customers</h1>
          <p>All customers in the system</p>
        </div>
        <Link to="/customers/add" className="btn btn-primary">+ Add Customer</Link>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
                  No customers yet
                </td>
              </tr>
            ) : (
              customers.map((c) => {
                const customerId = c.customerID ?? c.CustomerID;
                return (
                <tr key={customerId}>
                  <td>{c.customerName ?? c.CustomerName}</td>
                  <td>{c.phone ?? c.Phone}</td>
                  <td>{c.address ?? c.Address}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        to={`/customers/edit/${customerId}`}
                        className="btn btn-outline"
                        style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(customerId)}
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
