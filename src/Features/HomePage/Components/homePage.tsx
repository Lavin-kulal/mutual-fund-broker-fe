import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../SCSS/styles.css";
import { useUser } from "../../Context/UserContext";

const LOGOUT_API = "http://localhost:8080/mfb/client/logout";

const HomePage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_API, {}, { withCredentials: true });
      setUser(null);
      navigate("/signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="homepage">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <nav className="tab-navbar">
        <NavLink to="/home/schemes" className="tablink">
          Schemes
        </NavLink>
        <NavLink to="/home/portfolio" className="tablink">
          Portfolio
        </NavLink>
      </nav>

      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
