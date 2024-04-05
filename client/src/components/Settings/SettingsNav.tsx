import "../../Styling/Components/SettingsComponent/_settingsNavbar.scss";
import { NavLink } from "react-router-dom";
import companyInfoIcon from "../../assets/companyInfoIcon.svg";

const SettingsNav: React.FC = () => {
  return (
    <nav className="settingsNav">
      <ul>
        <NavLink to="company-profile">
          <li>
            <img src={companyInfoIcon} alt="companyInfoIcon" />
            <span>Company Profile</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SettingsNav;
