import { AllCustomerTypes } from "../../../types/customerAPITypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import TableSkeletonLoading from "../../GlobalComponents/SkeletonLoading/TableSkeletonLoading";
import editIcon from "../../../assets/editInvoiceDetailsIcon.svg";
import detailsICon from "../../../assets/detailsIcon.svg";

interface CustomerTableProps {
  allCustomersDataLoading: boolean;
  allCustomersDataError: Error;
  allCustomersData?: AllCustomerTypes[];
  openEditRoute: (id: number) => void;
  openDetailsRoute: (id: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  allCustomersDataLoading,
  allCustomersDataError,
  allCustomersData,
  openEditRoute,
  openDetailsRoute,
}) => {
  const handleEditCustomer = (id: number) => {
    openEditRoute(id);
  };

  if (allCustomersDataError)
    return (
      <ErrorMinimalDisplay errorMessage={allCustomersDataError?.message} />
    );
  if (allCustomersDataLoading) return <TableSkeletonLoading />;
  return (
    <div className="table width600">
      <table>
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Customer</th>
            <th>Street</th>
            <th>ZipCode</th>
            <th>City</th>
            <th>Country</th>
            <th>Details</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allCustomersData?.length ? (
            allCustomersData?.map((customer) => (
              <tr key={customer?.id}>
                <td data-cell="ID Number">
                  {customer?.idNumber ?? "Not Found"}
                </td>
                <td data-cell="Customer">{customer?.customerName ?? ""}</td>
                <td data-cell="Street">{customer?.street ?? "No Data"}</td>
                <td data-cell="ZipCode">{customer?.zipcode ?? "No Data"}</td>
                <td data-cell="City">{customer?.city ?? "No Data"}</td>
                <td data-cell="Country">{customer?.country ?? "No Data"}</td>
                <td data-cell="Details">
                  <img
                    onClick={() => openDetailsRoute(customer?.id ?? 0)}
                    src={detailsICon}
                    alt="edit Icon"
                  />
                </td>
                <td data-cell="Edit">
                  <img
                    onClick={() => handleEditCustomer(customer?.id ?? 0)}
                    src={editIcon}
                    alt="edit Icon"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td data-cell="status" colSpan={7}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
