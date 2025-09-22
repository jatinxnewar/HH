import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Community Verification" },
  { to: "/helper-discovery-map", label: "Helper Map" },
  { to: "/task-posting-dashboard", label: "Task Posting" },
  { to: "/helper-profile-details", label: "Profile Details" },
  { to: "/task-management-hub", label: "Task Hub" },
  { to: "/emergency-sos-center", label: "SOS Center" },
];

const Navbar = () => (
  <nav className="bg-white border-b border-border px-4 py-2 flex items-center gap-4 shadow-sm sticky top-0 z-50">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `px-3 py-1 rounded font-medium transition-colors duration-150 ${
            isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`
        }
        end={item.to === "/"}
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default Navbar;
