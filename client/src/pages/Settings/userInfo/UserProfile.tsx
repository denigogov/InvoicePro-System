import { useState } from "react";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { fetchAllUsers } from "../../../api/userAPI";
import { useAuth } from "../../../helpers/useAuth";
import useSWR from "swr";

const UserProfile: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState(false);

  const auth = useAuth();
  const token = auth?.token;
  const userID = auth.userInfo?.id ?? 1;

  const navigator = useNavigate();
  const location = useLocation();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/user-profile");
  };

  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token], () =>
    fetchAllUsers(token ?? "")
  );

  // Just for View Purpose I add id 1, by default this will be null
  const findUser = allUserData?.find((user) =>
    user.userId === auth.userInfo?.id ? auth.userInfo?.id : userID
  );

  const userDetails = [
    { label: "First Name", value: findUser?.firstName ?? "No Data" },
    { label: "Last Name", value: findUser?.lastName ?? "No Data" },
    { label: "Email", value: findUser?.email ?? "No Data" },
    { label: "Department", value: findUser?.departmentName ?? "No Data" },
  ];

  return (
    <div className="width600">
      <CompanyDetails
        companyDataError={allUserDataError}
        companyDataLoading={allUserDataLoading}
        companyDetails={userDetails}
        title="Account Details"
        navigateTo={`${
          location.pathname === "/settings" ? "user-profile" : `edit/${userID}`
        }`}
        setPopupOpen={setPopupOpen}
      />

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={findUser} />
          </main>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
