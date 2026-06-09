import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="app-card nav-bar">
      <div className="nav-brand">
        <span className="nav-brand-title">Student Attendance</span>
        <span className="nav-brand-subtitle">Track presence with clarity</span>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          Attendance
        </NavLink>

        <NavLink
          to="/report"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          Report
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;