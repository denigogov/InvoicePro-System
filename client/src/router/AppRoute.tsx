import { Outlet } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";

interface AppRouteProps {}

const AppRoute: React.FC<AppRouteProps> = ({}) => {
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
