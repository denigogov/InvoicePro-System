import useSWR from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { fetchAllUsers } from "../../../api/userAPI";
import { useState } from "react";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";

interface EmployeesSettingsProps {}

const EmployeesSettings: React.FC<EmployeesSettingsProps> = () => {
  const [tete, setPopupOpen] = useState(false);
  const { token } = useAuth();
  console.log(tete);
  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token], () =>
    fetchAllUsers(token ?? "")
  );

  if (allUserDataLoading) return "loading";
  if (allUserDataError) return allUserDataError?.message;

  return (
    <div>
      {allUserData?.map((user) => {
        const userDetails = [
          { label: "Email", value: user.email ?? "N/A" },
          { label: "Department", value: user.departmentName ?? "N/A" },
          { label: "Phone", value: user.userId.toString() ?? "N/A" },
        ];

        return (
          <CompanyDetails
            companyDataError={allUserDataError}
            companyDataLoading={allUserDataLoading}
            companyDetails={userDetails}
            title={`${user?.firstName} ${user.lastName ?? "No User"}`}
            navigateTo={`${
              location.pathname === "/settings"
                ? "company-profile/edit-info"
                : "edit-info"
            }`}
            setPopupOpen={setPopupOpen}
          />
        );
      })}
    </div>
  );
};

export default EmployeesSettings;
