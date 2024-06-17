import moment from "moment";
import { RecentInvoicesType } from "../../types/invoiceTypes";
import ErrorMinimalDisplay from "../GlobalComponents/ErrorMinimalDisplay";
import TableSkeletonLoading from "../GlobalComponents/SkeletonLoading/TableSkeletonLoading";

interface DashTableProps {
  recentInvoicesDataError: Error;
  recentInvoicesDataLoading: boolean;
  recentInvoicesData?: RecentInvoicesType[];
}

const DashTable: React.FC<DashTableProps> = ({
  recentInvoicesDataError,
  recentInvoicesDataLoading,
  recentInvoicesData,
}) => {
  const getStatusClass = (statusID: number | undefined) => {
    switch (statusID) {
      case 1:
        return "status-draft";
      case 2:
        return "status-sent";
      case 3:
        return "status-paid";
      case 4:
        return "status-overdue";
      case 5:
        return "status-void";
      default:
        return "noStatus";
    }
  };

  // card-${statusId} cards

  if (recentInvoicesDataError)
    return (
      <ErrorMinimalDisplay errorMessage={recentInvoicesDataError?.message} />
    );

  if (recentInvoicesDataLoading) return <TableSkeletonLoading />;
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentInvoicesData?.length ? (
            recentInvoicesData?.map((d) => (
              <tr key={d?.invoiceId}>
                <td data-cell="Invoice ID">{d?.invoiceId ?? "Not Found"}</td>
                <td data-cell="Customer">{d?.customerName ?? "Not Found"}</td>
                <td data-cell="Date">
                  {moment(d?.date).format("Do MMMM YYYY")}
                </td>
                <td data-cell="Price">€ {d?.totalPrice ?? "Not Found"}</td>
                <td data-cell="Status" className="td-status">
                  <span className={`span-td ${getStatusClass(d?.statusId)}`}>
                    {d?.statusName ?? ""}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td data-cell="status" colSpan={5}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashTable;
