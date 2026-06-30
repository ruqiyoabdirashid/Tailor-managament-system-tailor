import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/customers", label: "Customers", icon: "👥" },
  { path: "/tailors", label: "Tailors", icon: "✂️" },
  { path: "/orders", label: "Orders", icon: "📦" },
  { path: "/measurements", label: "Measurements", icon: "📏" },
  // { path: "/report", label: "Reports", icon: "📋" },
  // { path: "/about", label: "About", icon: "ℹ️" },
];

function isActive(pathname, item) {
  if (item.exact) return pathname === item.path;
  return pathname === item.path || pathname.startsWith(item.path + "/");
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="sidebar-logo">
        <img src={logo} alt="Tailor Pro Logo" className="sidebar-logo-img" />
        <span className="sidebar-logo-text">Tailor Pro</span>
      </Link>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(location.pathname, item) ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
