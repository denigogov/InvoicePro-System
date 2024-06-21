import "../../../Styling/Components/AdministrationComponentsStyle/_showEmployees.scss";
import { Link, useLocation } from "react-router-dom";
import testIcon from "../../../assets/userIcon.svg";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import EmployerInfoSkeletonLoading from "../../GlobalComponents/SkeletonLoading/EmployerInfoSkeletonLoading";
interface ShowEmployeesProps {
  allUserData?: FetchAllUsersTypes[];
  allUserDataError: Error;
  allUserDataLoading: boolean;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (id: number) => void;
}

const ShowEmployees: React.FC<ShowEmployeesProps> = ({
  allUserData,
  allUserDataError,
  allUserDataLoading,
  setPopupOpen,
  handleDeleteUser,
}) => {
  const { pathname } = useLocation();

  const handleEditUser = () => {
    setPopupOpen((e) => !e);
  };

  if (allUserDataLoading) return <EmployerInfoSkeletonLoading />;
  if (allUserDataError)
    return <ErrorMinimalDisplay errorMessage={allUserDataError?.message} />;
  return (
    <div className="showEmployees width500">
      <ul>
        {allUserData?.map((user) => (
          <li key={user?.userId}>
            <div className="showEmployees__text">
              <div className="showEmployees__text-icon">
                <img src={testIcon} alt="userICon" />
              </div>
              <div className="showEmployees__text-info">
                <p className="showEmployees__text-info-name">{`${
                  user?.firstName ?? "Not Found"
                } ${user?.lastName ?? ""}`}</p>
                <p className="showEmployees__text-info-email">
                  {user?.email ?? "Not Found"}
                </p>
                <p className="showEmployees__text-info-department">
                  {user?.departmentName ?? "Not Found"}
                </p>
              </div>
            </div>

            <div className="showEmployees__button">
              <Link
                className=""
                to={
                  pathname === "/administration"
                    ? `employees/edit/${user?.userId}`
                    : `edit/${user?.userId}`
                }
                unstable_viewTransition
              >
                <p onClick={handleEditUser}>Manage</p>
              </Link>
              <p
                className="deleteBtn"
                onClick={() => handleDeleteUser(user?.userId)}
              >
                Delete
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowEmployees;
