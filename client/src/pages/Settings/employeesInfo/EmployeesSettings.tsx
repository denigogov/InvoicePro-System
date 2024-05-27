import "../../../Styling/Components/SettingsComponent/_employeesSettings.scss";
import useSWR from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { fetchAllUsers } from "../../../api/userAPI";
import EmployesTable from "../../../components/Settings/EmployeesComponents/EmployesTable";

interface EmployeesSettingsProps {}

const EmployeesSettings: React.FC<EmployeesSettingsProps> = () => {
  const { token } = useAuth();

  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token], () =>
    fetchAllUsers(token ?? "")
  );

  return (
    <div className="employeesSettings">
      <EmployesTable
        allUserData={allUserData}
        allUserDataLoading={allUserDataLoading}
        allUserDataError={allUserDataError}
      />
    </div>
  );
};

export default EmployeesSettings;
