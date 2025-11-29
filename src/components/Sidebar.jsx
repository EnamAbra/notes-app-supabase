import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Sidebar({ showNav, setShowNav }) {
  return (
    <div className={showNav ? "sidenav active" : "sidenav"}>

      <ul>
      
        <li><Link to="/dashboard/add">Add Note</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/noteeditor">Edit Note</Link></li>

      </ul>

    </div>
  );
}

export default Sidebar;
