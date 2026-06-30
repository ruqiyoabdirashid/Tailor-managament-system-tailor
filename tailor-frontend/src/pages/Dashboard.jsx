import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers } from "../Services/customerService";
import { getTailors } from "../Services/tailorService";
import { getOrders } from "../Services/orderService";
import { getMeasurements } from "../Services/measurementService";

const stats = [
  { key: "customers", label: "Customers", icon: "👥", color: "blue", link: "/customers" },
  { key: "tailors", label: "Tailors", icon: "✂️", color: "green", link: "/tailors" },
  { key: "orders", label: "Orders", icon: "📦", color: "gold", link: "/orders" },
  { key: "measurements", label: "Measurements", icon: "📏", color: "purple", link: "/measurements" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({
    customers: 0,
    tailors: 0,
    orders: 0,
    measurements: 0,
  });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [customers, tailors, orders, measurements] = await Promise.all([
          getCustomers(),
          getTailors(),
          getOrders(),
          getMeasurements(),
        ]);

        setCounts({
          customers: (customers.data ?? []).length,
          tailors: (tailors.data ?? []).length,
          orders: (orders.data ?? []).length,
          measurements: (measurements.data ?? []).length,
        });
      } catch {
        setCounts({ customers: 0, tailors: 0, orders: 0, measurements: 0 });
      }
    };

    loadCounts();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome — here is an overview of your system</p>
      </div>

      <div className="grid-4" style={{ marginBottom: "2rem" }}>
        {stats.map((s) => (
          <Link key={s.key} to={s.link} style={{ textDecoration: "none" }}>
            <div className="stat-card">
              <div className={`stat-icon ${s.color}`}>{s.icon}</div>
              <div className="stat-info">
                <h3>{counts[s.key]}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
