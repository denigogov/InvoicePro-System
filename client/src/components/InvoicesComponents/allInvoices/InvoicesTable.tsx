import detailsIcon from "../../../assets/detailsIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { AllInvoicesPaginationType } from "../../../types/invoiceTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import moment from "moment";

interface InvoicesTableProps {
  allInvoicePagination?: AllInvoicesPaginationType[];
  allInvoicePaginationError: Error;
  allInvoicePaginationLoading: boolean;

  openDetailsRoute: (invoiceId: string) => void;
}
const InvoicesTable: React.FC<InvoicesTableProps> = ({
  allInvoicePagination,
  allInvoicePaginationError,
  allInvoicePaginationLoading,

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

  if (allInvoicePaginationError)
    return (
      <ErrorMinimalDisplay errorMessage={allInvoicePaginationError?.message} />
    );
  if (allInvoicePaginationLoading) return <LoadingRing />;

  return (
    <div className="tableWithPadding width600">
      <table>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Created At</th>
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
                <td data-cell="Created At">
                  {moment(invoice?.currentDate ?? "").format("Do MMMM YYYY")}
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
                  <img src={deleteIcon} alt="Delete Icon" />
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
