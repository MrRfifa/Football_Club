import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { SidebarData } from "./CoachSidebarData";
import { Button } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import "./CoachSidebar.css";
import { IconContext } from "react-icons";

function CoachSidebar({ username }) {
  const [sidebarr, setSidebarr] = useState(true);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:3001/auth/logout");
    await getLoggedIn();
    history("/");
  }
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const showSidebar = () => setSidebarr(true);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="sidebar" style={{ marginLeft: "250px" }}>
          <div style={{ marginLeft: "1100px" }}>
            <div
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "#f5f5f5",
                padding: "5px 30px",
                borderRadius: "4px",
              }}
            >
              {username}
            </div>
          </div>
        </div>
        <nav className={sidebarr ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link
                to="#"
                className="menu-bars"
                style={{ pointerEvents: sidebarr === false ? "" : "none" }}
              >
                <AiIcons.AiOutlineMenu />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <Button
              variant="contained"
              endIcon={<FiLogOut />}
              onClick={logOut}
              style={{
                borderRadius: 20,
                padding: "18px 25px",
                fontSize: "18px",
                marginLeft: "30px",
                marginTop: "375px",
                backgroundColor: isHovering ? "#060b26" : "#010606",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Logout
            </Button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default CoachSidebar;
