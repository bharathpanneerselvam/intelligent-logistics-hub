import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  
  const location = useLocation();

  const links = [
    { to: "/admin",            label: "Dashboard"  },
    { to: "/admin/forecast",   label: "Forecast"   },
    { to: "/admin/inspection", label: "Inspection" },
  ];

  return (
    <div className="sidebar">
 
      <h2 className="logo">
        FOREVER<span>.</span>
      </h2>
      <span className="logo-sub">Admin Panel</span>

      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to} 
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Sidebar;
