import detailsIcon from "../../../assets/detailsIcon.svg";
import editIcon from "../../../assets/editIcon.svg";
import { InvoicePaginationDataType } from "../../../types/invoiceTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import moment from "moment";
import TableSkeletonLoading from "../../GlobalComponents/SkeletonLoading/TableSkeletonLoading";

interface InvoicesTableProps {
  allInvoicePagination?: InvoicePaginationDataType[];
  allInvoicePaginationError: Error;
  allInvoicePaginationLoading: boolean;
  openEditRoute: (invoiceId: string) => void;
  openDetailsRoute: (invoiceId: string) => void;
}
const InvoicesTable: React.FC<InvoicesTableProps> = ({
  allInvoicePagination,
  allInvoicePaginationError,
  allInvoicePaginationLoading,
  openEditRoute,
  openDetailsRoute,
}) => {
  const getStatusClass = (statusName: string | undefined) => {
    switch (statusName) {
      case "Draft":
        return "status-draft";
      case "Sent":
        return "status-sent";
      case "Paid":
        return "status-paid";
      case "Overdue":
        return "status-overdue";
      case "Void":
        return "status-void";
      default:
        return "noStatus";
    }
  };

  const handleDetails = (invoiceId: string) => {
    openDetailsRoute(invoiceId);
  };
  const handleClickEdit = (invoiceId: string) => {
    openEditRoute(invoiceId);
  };

  if (allInvoicePaginationError)
    return (
      <ErrorMinimalDisplay errorMessage={allInvoicePaginationError?.message} />
    );
  if (allInvoicePaginationLoading) return <TableSkeletonLoading />;

  return (
    <div className="tableWithPadding width600">
      <table>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Invoice Date</th>
            <th>Status</th>
            <th>Details</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {allInvoicePagination?.length ? (
            allInvoicePagination?.map((invoice) => (
              <tr key={invoice?.id}>
                <td data-cell="Invoice Id">{invoice?.invoiceId ?? "#"}</td>
                <td data-cell="Customer">{invoice?.customerName ?? ""}</td>
                <td data-cell="Total Price">€ {invoice?.totalPrice ?? 0}</td>
                <td data-cell="Invoice Date">
                  {moment(invoice?.date ?? "").format("Do MMMM YYYY")}
                </td>
                <td data-cell="Status" className="td-status">
                  <span
                    className={`span-td ${getStatusClass(invoice?.statusName)}`}
                  >
                    {invoice?.statusName ?? ""}
                  </span>
                </td>
                <td data-cell="Details">
                  <img
                    src={detailsIcon}
                    alt="Details Icon"
                    onClick={() => handleDetails(invoice?.invoiceId)}
                  />
                </td>
                <td data-cell="Modify">
                  <img
                    src={editIcon}
                    alt="Edit Icon"
                    onClick={() => handleClickEdit(invoice?.invoiceId)}
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

export default InvoicesTable;
