import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopNav.css"; // Import styles

const TopNav = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="top-nav">

      <div className="nav-left">
        <span className="welcome-text">Welcome, {username}</span>
      </div>
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
