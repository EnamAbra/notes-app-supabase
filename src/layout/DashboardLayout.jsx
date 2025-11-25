import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../layout/Dashboard.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <RxHamburgerMenu
          className="menu-icon"
          onClick={() => setShowNav(!showNav)}
        />
      </header>

      <Sidebar showNav={showNav} setShowNav={setShowNav} />

      <main className={showNav ? "content shift" : "content"}>
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;
