import { Outlet } from "react-router-dom";
import AdministrationNav from "../../components/AdministrationComponents/AdministrationNav";

interface AdministrationProps {}

const Administration: React.FC<AdministrationProps> = () => {
  return (
    <div>
      <AdministrationNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Administration;
