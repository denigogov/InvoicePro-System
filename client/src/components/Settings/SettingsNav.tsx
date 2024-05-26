import "../../Styling/Components/SettingsComponent/_settingsNavbar.scss";
import { NavLink } from "react-router-dom";

const SettingsNav: React.FC = () => {
  return (
    <nav className="settingsNav">
      <div className="settingsNav__title">
        <h1 className="settingsNav__title-head">Settings</h1>
        <p className="settingsNav__title-subHead">
          Customize your invoice settings
        </p>
      </div>
      <ul>
        <NavLink
          to="company-profile"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
        >
          <li>Company Profile</li>
        </NavLink>

        <NavLink
          to="user-profile"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
        >
          <li>User Profile</li>
        </NavLink>

        <NavLink
          to="employees"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
        >
          <li>Employees Profile</li>
        </NavLink>

        <NavLink
          to="invoices"
          className={({ isActive }) => (isActive ? "settingsActiveLink" : "")}
        >
          <li>Invoices Settings</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SettingsNav;
