import "../Styling/Components/_appNavigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../assets/truck-long-svgrepo-com.svg";
import logoutIcon from "../assets/logoutBtnIcon.svg";
import dashboardIcon from "../assets/dashboardIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import invoiceIcon from "../assets/invoiceIcon.svg";
import { useState } from "react";
import { useAuth } from "../helpers/useAuth";

const AppNavigation = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const auth = useAuth();
  const navigation = useNavigate();

  const handleNavBar = () => {
    setOpenNav((e) => !e);
  };

  const handleLogout = () => {
    auth.logout();
    navigation("/");
  };

  return (
    <div className="appNavigation">
      <nav className={`navbar  ${openNav ? "openNav" : "closeNav"} `}>
        <span className="logo">
          <img src={logoIcon} alt="Logo" />
        </span>
        <span
          className={
            openNav
              ? "arrowOpenCloseNav animationArrow"
              : "arrowOpenCloseNav animationArrowBackwords"
          }
          onClick={handleNavBar}
        ></span>
        <ul>
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
