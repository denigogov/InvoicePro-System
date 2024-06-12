import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdministrationNav: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  //   The SAME LAYOUT AND CSS AS SETTINGS NAV !! - styling in settings
  return (
    <nav className="settingsNav">
      <div className="settingsNav__title">
        <h1 className="settingsNav__title-head">Administration</h1>
        <p className="settingsNav__title-subHead">
          Manage your company’s employees, customers, and profiles
        </p>
      </div>
      <button className="settingsNav__toggle" onClick={toggleNavVisibility}>
        {isNavVisible ? "Hide Administration" : "Show Administration"}
      </button>
      <ul className={`settingsNav__links ${isNavVisible ? "visible" : ""}`}>
        <NavLink
          to="employees"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Employees Profile</li>
        </NavLink>

        <NavLink
          to="customers"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
          onClick={toggleNavVisibility}
        >
          <li>Customers Settings</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default AdministrationNav;
