import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current location using useLocation hook
  const { tenantName } = useParams();
  const [expandedItem, setExpandedItem] = useState(null);

  // Function to handle clicking on a menu item
  const handleItemClick = (item) => {
    // If the clicked item is already expanded, collapse it
    // Otherwise, expand the clicked item
    setExpandedItem(item === expandedItem ? null : item);
  };

  return (
    <aside id="sidebar" className="sidebar" style={{width: "300px"}}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === `/admin` ? "active" : ""}`}
            to={`/admin`}
          >
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* End Dashboard Nav */}
        <li className="nav-item">
          <Link
            className={`nav-link ${expandedItem === "reports" ? "" : "collapsed"}`}
            to="/user/reports"
            onClick={() => handleItemClick("reports")}
          >
            <i className="bi bi-flag-fill"></i>
            <span>Reports</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${expandedItem === "users" ? "" : "collapsed"}`}
            to="/user/users"
            onClick={() => handleItemClick("users")}
          >
            <i className="bi bi-ticket-detailed"></i>
            <span>User Management</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${expandedItem === "Upload" ? "" : "collapsed"}`}
            to="/Upload"
            onClick={() => handleItemClick("Upload")}
          >
            <i className="bi bi-ticket-detailed"></i>
            <span>Upload File</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
