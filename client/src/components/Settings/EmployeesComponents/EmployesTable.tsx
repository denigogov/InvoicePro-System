import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import TableSkeletonLoading from "../../GlobalComponents/SkeletonLoading/TableSkeletonLoading";

interface EmployesTableProps {
  allUserData?: FetchAllUsersTypes[];
  allUserDataError: Error;
  allUserDataLoading: boolean;
}

const EmployesTable: React.FC<EmployesTableProps> = ({
  allUserData,
  allUserDataError,
  allUserDataLoading,
}) => {
  if (allUserDataLoading) return <TableSkeletonLoading />;
  if (allUserDataError)
    return <ErrorMinimalDisplay errorMessage={allUserDataError?.message} />;
  return (
    <div>
      <table className="width600">
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
                  <td data-cell="Modify">img</td>
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
