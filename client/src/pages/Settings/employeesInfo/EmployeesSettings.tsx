import "../../../Styling/Components/SettingsComponent/_employeesSettings.scss";
import useSWR from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { fetchAllUsers } from "../../../api/userAPI";
import EmployesTable from "../../../components/Settings/EmployeesComponents/EmployesTable";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

interface EmployeesSettingsProps {}

const EmployeesSettings: React.FC<EmployeesSettingsProps> = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const { token } = useAuth();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator(`/administration/employees`);
  };

  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token], () =>
    fetchAllUsers(token ?? "")
  );

  return (
    <div className="employeesSettings">
      <h3 className="employeesSettings-title">Employees Profile</h3>
      <Link onClick={popupWindow} to="create">
        Create Emplyeer
      </Link>
      <EmployesTable
        allUserData={allUserData}
        allUserDataLoading={allUserDataLoading}
        allUserDataError={allUserDataError}
        setPopupOpen={setPopupOpen}
      />
      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default EmployeesSettings;
