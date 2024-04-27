import detailsIcon from "../../../assets/dashboardIcon.svg";
import deleteIcon from "../../../assets/addIcon.svg";
import { AllInvoicesPaginationType } from "../../../types/invoiceTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import moment from "moment";

interface InvoicesTableProps {
  allInvoicePagination?: AllInvoicesPaginationType[];
  allInvoicePaginationError: Error;
  allInvoicePaginationLoading: boolean;
  deleteInvoiceRequest: (id: number) => void;
}
const InvoicesTable: React.FC<InvoicesTableProps> = ({
  allInvoicePagination,
  allInvoicePaginationError,
  allInvoicePaginationLoading,
  deleteInvoiceRequest,
}) => {
  const status = allInvoicePagination?.length
    ? allInvoicePagination?.map((item) => item.statusName)
    : "noStatus";
  let statusClass;

  switch (status[0]) {
    case "Draft":
      statusClass = "status-draft";
      break;

    case "Sent":
      statusClass = "status-sent";
      break;

    case "Paid":
      statusClass = "status-paid";
      break;

    case "overdue":
      statusClass = "status-overdue";
      break;
    case "void":
      statusClass = "status-void";
      break;
    default:
      statusClass = "noStatus";
      break;
  }

  const handleDelete = (id: number) => {
    deleteInvoiceRequest(id);
  };

  if (allInvoicePaginationError)
    return (
      <ErrorMinimalDisplay errorMessage={allInvoicePaginationError?.message} />
    );
  if (allInvoicePaginationLoading) return <LoadingRing />;

  return (
    <div className="table width600">
      <table>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Details</th>
            <th>Delete</th>
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
                  {" "}
                  {moment(invoice?.currentDate ?? "").format("Do MMMM YYYY")}
                </td>
                <td data-cell="Status" className="td-status">
                  <span className={`span-td ${statusClass}`}>
                    {invoice?.statusName ?? ""}
                  </span>
                </td>
                <td data-cell="Details">
                  <img src={detailsIcon} alt="Details Icon" />
                </td>
                <td data-cell="Delete">
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    onClick={() => handleDelete(invoice?.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
