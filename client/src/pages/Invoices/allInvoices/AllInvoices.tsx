import useSWR, { useSWRConfig } from "swr";
import "../../../Styling/Components/InvoiceComponentStyle/_allInvoice.scss";
import InvoiceTableNav from "../../../components/InvoicesComponents/allInvoices/InvoiceTableNav";
import InvoicesTable from "../../../components/InvoicesComponents/allInvoices/InvoicesTable";
import { AllInvoicesPaginationType } from "../../../types/invoiceTypes";
import { useAuth } from "../../../helpers/useAuth";
import {
  deleteInvoice,
  fetchAllInvoicesPagination,
} from "../../../api/invoiceAPI";
import { confirmDeletePrompt } from "../../../components/GlobalComponents/deletePrompt";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

interface AllInvoicesProps {}

const AllInvoices: React.FC<AllInvoicesProps> = ({}) => {
  const { token } = useAuth();
  const { mutate } = useSWRConfig();

  const {
    data: allInvoicePagination,
    error: allInvoicePaginationError,
    isLoading: allInvoicePaginationLoading,
  } = useSWR<AllInvoicesPaginationType[]>(["allInvoicePagination", token], () =>
    fetchAllInvoicesPagination(token ?? "", 1, 10)
  );

  const deleteInvoiceRequest = async (id: number) => {
    const confirmDelete = confirmDeletePrompt(
      "Confirm deletion",
      `Do you want to proceed with deleting this invoice?`
    );

    try {
      if ((await confirmDelete).isConfirmed) {
        deleteInvoice(token ?? "", id);
        mutate(["allInvoicePagination", token]);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="allInvoices">
      <InvoiceTableNav />
      <InvoicesTable
        allInvoicePagination={allInvoicePagination}
        allInvoicePaginationError={allInvoicePaginationError}
        allInvoicePaginationLoading={allInvoicePaginationLoading}
        deleteInvoiceRequest={deleteInvoiceRequest}
      />
    </div>
  );
};

export default AllInvoices;
