import React from "react";
import "../layout/Dashboard.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
function DashboardLayout() {
  return (
    <div className="container">
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
