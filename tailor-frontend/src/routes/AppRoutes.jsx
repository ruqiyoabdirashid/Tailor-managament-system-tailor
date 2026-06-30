import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import About from "../pages/About";
import Report from "../pages/Report";

import CustomerList from "../customers/CustomerList";
import AddCustomer from "../customers/AddCustomer";
import EditCustomer from "../customers/EditCustomer";

import TailorList from "../tailors/TailorList";
import AddTailor from "../tailors/AddTailor";
import EditTailor from "../tailors/EditTailor";

import OrderList from "../orders/OrderList";
import AddOrder from "../orders/AddOrder";
import EditOrder from "../orders/EditOrder";

import MeasurementList from "../measurements/MeasurementList";
import AddMeasurement from "../measurements/AddMeasurement";
import EditMeasurement from "../measurements/EditMeasurement";

function RequireAuth() {
  const location = useLocation();
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
         
            <Route path="/report" element={<Report />} />

            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />
            <Route path="/customers" element={<CustomerList />} />

            <Route path="/tailors/add" element={<AddTailor />} />
            <Route path="/tailors/edit/:id" element={<EditTailor />} />
            <Route path="/tailors" element={<TailorList />} />

            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/orders/edit/:id" element={<EditOrder />} />
            <Route path="/orders" element={<OrderList />} />

            <Route path="/measurements/add" element={<AddMeasurement />} />
            <Route path="/measurements/edit/:id" element={<EditMeasurement />} />
            <Route path="/measurements" element={<MeasurementList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
