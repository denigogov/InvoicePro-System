import "../../Styling/Components/SettingsComponent/_settingsNavbar.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SettingsNav: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className="settingsNav">
      <div className="settingsNav__title">
        <h1 className="settingsNav__title-head">Settings</h1>
        <p className="settingsNav__title-subHead">
          Customize your invoice settings
        </p>
      </div>
      <button className="settingsNav__toggle" onClick={toggleNavVisibility}>
        {isNavVisible ? "Hide Settings" : "Show Settings"}
      </button>
      <ul className={`settingsNav__links ${isNavVisible ? "visible" : ""}`}>
        <NavLink
          to="company-profile"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Company Profile</li>
        </NavLink>

        <NavLink
          to="user-profile"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Account Settings</li>
        </NavLink>

        <NavLink
          to="employees"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Employees Profile</li>
        </NavLink>

        <NavLink
          to="invoices"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Invoices Settings</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SettingsNav;
