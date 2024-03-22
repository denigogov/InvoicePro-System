import "../Styling/Components/_appNavigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from "../assets/truck-long-svgrepo-com.svg";
import logoutIcon from "../assets/logoutBtnIcon.svg";
import dashboardIcon from "../assets/dashboardIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import invoiceIcon from "../assets/invoiceIcon.svg";
import linkedInLogo from "../assets/linkedInLogo.svg";
import { useState } from "react";

const AppNavigation = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  //   const auth = useAuth();
  const navigate = useNavigate();

  // const location = useLocation();
  // const matchLocation =
  //   location.pathname === "/app" || location.pathname === "/login";

  const handleNavBar = () => {
    setOpenNav((e) => !e);
  };

  //   const handleLogOut = () => {
  //     auth.logout();
  //   };

  return (
    <div className="appNavigation">
      {/* I add  this one  "openNav closeNav" to be able to style on desktop */}
      <div className={openNav ? "openNav" : "openNav closeNav"}>
        <div className="logo">
          <img
            src={logoIcon}
            alt="company logo"
            onClick={() => navigate("/")}
          />
          <p>
            <span className="companyName">All Transport</span> InvoicePro System
          </p>
        </div>

        <div className="navLinkInfo mobile">
          {/* <p>{auth.userInfo?.username ?? ""}</p> */}
          <p>username</p>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul>
            <NavLink to="/dashboard">
              <li>
                Dashboard
                <img src={dashboardIcon} alt="Dashboard Icon" />
              </li>
            </NavLink>

            <NavLink to="invoices">
              <li>
                Invoices
                <img src={invoiceIcon} alt="Invoice Icon" />
              </li>
            </NavLink>

            <NavLink to="settings">
              <li>
                Settings
                <img src={settingsIcon} alt="Settings Icon" />
              </li>
            </NavLink>

            <li className="logoutIcon">
              <img className="logoutIcon" src={logoutIcon} alt="logout Icon" />
            </li>
          </ul>
        </nav>

        {/* Footer only avaible to phone */}
        <div className="nav-footer">
          <div className="nav-footer__icon">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/dejan-gogov-571871270/"
            >
              <img src={linkedInLogo} alt="linkedIn Logo" />
            </a>
          </div>
          <p className="navLinkInfo">Dejan Gogov</p>
        </div>
      </div>
      {/* Navigation Hamburger Menu only Avaible on phone */}
      <div className={openNav ? "overlay" : ""} onClick={handleNavBar}>
        {!openNav && (
          <div className="navIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppNavigation;
