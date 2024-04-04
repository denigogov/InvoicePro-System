import { Outlet } from "react-router-dom";
import SettingsNav from "../../components/Settings/SettingsNav";

const Settings: React.FC = () => {
  return (
    <div className="settingsRoot">
      <SettingsNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Settings;
