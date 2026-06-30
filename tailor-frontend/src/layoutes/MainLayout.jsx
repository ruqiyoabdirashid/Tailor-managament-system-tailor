import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/sidebar";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-layout ${isHome ? "home-layout" : ""} ${!isHome && !sidebarOpen ? "sidebar-collapsed" : ""}`}>
      {!isHome && <Sidebar />}

      <div className="main-area">
        <Navbar
          showMenuToggle={!isHome}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
