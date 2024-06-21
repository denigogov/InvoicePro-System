import "../../../Styling/Components/SettingsComponent/_employeesSettings.scss";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { deleteUser, fetchAllUsers } from "../../../api/userAPI";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ShowEmployees from "../../../components/Settings/EmployeesComponents/ShowEmployees";
import { confirmDeletePrompt } from "../../../components/GlobalComponents/deletePrompt";

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

  const handleDeleteUser = async (id: number) => {
    console.log(id);
    const confirmedDeleteMessage = await confirmDeletePrompt(
      "Delete Employee Confirmation",
      "Are you sure you want to permanently delete this employee? This action cannot be undone"
    );

    if (confirmedDeleteMessage.isConfirmed) {
      await deleteUser(token ?? "", id ?? null);
      mutate(["allUserData", token]);
    }
  };

  return (
    <div className="employeesSettings">
      <nav className="employeesSettings__title">
        <h3 className="employeesSettings__title-title">Employees Profile</h3>

        <Link
          className="employeesSettings__title-route"
          onClick={popupWindow}
          to="create"
        >
          <p>
            <span>+</span>New member
          </p>
        </Link>
      </nav>

      <ShowEmployees
        allUserData={allUserData}
        allUserDataLoading={allUserDataLoading}
        allUserDataError={allUserDataError}
        setPopupOpen={setPopupOpen}
        handleDeleteUser={handleDeleteUser}
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
