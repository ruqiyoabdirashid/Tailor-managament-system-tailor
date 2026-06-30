import { Link } from "react-router-dom";

export default function Navbar({ showMenuToggle, onToggleSidebar }) {
  const user = localStorage.getItem("user");

  return (
    <header className="navbar navbar-app">
      <div className="navbar-left">
        {showMenuToggle && (
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      <div className="navbar-user">
        {user ? (
          <span>👤 {user}</span>
        ) : (
          <Link to="/login" className="btn btn-primary navbar-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}