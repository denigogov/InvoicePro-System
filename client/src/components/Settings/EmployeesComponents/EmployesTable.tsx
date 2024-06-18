import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import TableSkeletonLoading from "../../GlobalComponents/SkeletonLoading/TableSkeletonLoading";
import editIcon from "../../../assets/editIcon.svg";
import { Link, useLocation } from "react-router-dom";

interface EmployesTableProps {
  allUserData?: FetchAllUsersTypes[];
  allUserDataError: Error;
  allUserDataLoading: boolean;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployesTable: React.FC<EmployesTableProps> = ({
  allUserData,
  allUserDataError,
  allUserDataLoading,

  setPopupOpen,
}) => {
  const { pathname } = useLocation();

  const handleEditUser = () => {
    setPopupOpen((e) => !e);
  };

  if (allUserDataLoading) return <TableSkeletonLoading />;
  if (allUserDataError)
    return <ErrorMinimalDisplay errorMessage={allUserDataError?.message} />;
  return (
    <div className="table width600">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {allUserData?.length ? (
            <>
              {allUserData.map((user) => (
                <tr key={user?.userId}>
                  <td data-cell="First Name">
                    {user?.firstName ?? "User Not Found"}
                  </td>
                  <td data-cell="Last Name">{user?.lastName}</td>
                  <td data-cell="Email">{user?.email ?? ""}</td>
                  <td data-cell="Department">{user?.departmentName}</td>
                  <td data-cell="Modify">
                    <Link
                      to={
                        pathname === "/administration"
                          ? `employees/edit/${user?.userId}`
                          : `edit/${user?.userId}`
                      }
                      unstable_viewTransition
                    >
                      <img
                        src={editIcon}
                        alt="editIcon"
                        onClick={handleEditUser}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={4} data-cell="status">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployesTable;
