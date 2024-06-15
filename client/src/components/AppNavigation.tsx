import "../Styling/Components/_appNavigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo1.svg";
import logoutIcon from "../assets/logoutBtnIcon.svg";
import dashboardIcon from "../assets/dashboardIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import administrationIcon from "../assets/administrationIcon.svg";
import invoiceIcon from "../assets/invoiceIcon.svg";
import { useState } from "react";
import { useAuth } from "../helpers/useAuth";

const AppNavigation = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [, setClickOnNavlink] = useState<boolean>(false);
  const auth = useAuth();
  const navigation = useNavigate();

  const handleNavBar = () => {
    setOpenNav((e) => !e);
    setClickOnNavlink(false);
  };

  const handleLogout = () => {
    auth.logout();
    navigation("/");
  };

  const handleClickOnMenuItem = () => {
    setClickOnNavlink(true);
    setOpenNav(false);
  };

  return (
    <div className="appNavigation">
      <div
        className={`${openNav ? "overlayNav" : ""}`}
        onClick={handleNavBar}
      ></div>
      <nav className={`navbar  ${openNav ? "openNav" : "closeNav"} `}>
        <NavLink to="/dashboard" onClick={handleNavBar}>
          <span className="logo">
            <img src={logoIcon} alt="Logo" />
            <p>
              nexi<span>go</span>
            </p>
          </span>
        </NavLink>
        <span
          className={
            openNav
              ? "arrowOpenCloseNav animationArrow"
              : "arrowOpenCloseNav animationArrowBackwords"
          }
          onClick={handleNavBar}
        ></span>
        <ul onClick={handleClickOnMenuItem}>
          <NavLink to="/dashboard">
            <li>
              <img src={dashboardIcon} alt="dashboardIcon" />
              <span>Home</span>
            </li>
          </NavLink>
          <NavLink to="/invoices">
            <li>
              <img src={invoiceIcon} alt="invoiceIcon" />
              <span>Invoices</span>
            </li>
          </NavLink>
          <NavLink to="/administration">
            <li>
              <img src={administrationIcon} alt="administrationIcon" />
              <span>Administration</span>
            </li>
          </NavLink>{" "}
          <NavLink to="/settings">
            <li>
              <img src={settingsIcon} alt="settingsIcon" />
              <span>Settings</span>
            </li>
          </NavLink>
          <li onClick={handleLogout}>
            <img src={logoutIcon} alt="logoutIcon" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppNavigation;
