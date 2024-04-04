import { Outlet } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";

const AppRoute: React.FC = () => {
  return (
    <div>
      <AppNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoute;
