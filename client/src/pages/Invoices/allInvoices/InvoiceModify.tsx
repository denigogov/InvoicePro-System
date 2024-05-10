import useSWR, { useSWRConfig } from "swr";
import { fetchStatusPriceTaxDiscount } from "../../../api/invoiceStatusAPI";
import EditInvoice from "../../../components/InvoicesComponents/EditInvoice";
import "../../../Styling/Components/GlobalComponentStyle/_inputFileds.scss";
import { useAuth } from "../../../helpers/useAuth";
import { SelectStatusAndPrice } from "../../../types/invoiceStatusTypes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import { updateInvoice } from "../../../api/invoiceAPI";
import { ContextTypeRouter } from "./AllInvoices";
import { AllInvoicesPaginationType } from "../../../types/invoiceTypes";

export type UpdateInvoiceQueryTypes = {
  totalPrice: string;
  tax: string;
  discount: string;
  statusId: string;
};

const InvoiceModify: React.FC = () => {
  const { token } = useAuth();
  const { invoiceId } = useParams();
  const { mutate } = useSWRConfig();

  const navigate = useNavigate();

  const [setPopupOpen, pageIndex] = useOutletContext<ContextTypeRouter>();

  const {
    data: invoiceStatusTaxDiscountPrice,
    error: invoiceStatusTaxDiscountPriceDataError,
    isLoading: invoiceStatusTaxDiscountPriceDataLoading,
  } = useSWR<SelectStatusAndPrice>(["invoiceSettings", token, invoiceId], () =>
    fetchStatusPriceTaxDiscount(token ?? "", invoiceId)
  );

  const invoiceAllStatus = invoiceStatusTaxDiscountPrice?.selectAllStatus;
  const invoiceEditData = invoiceStatusTaxDiscountPrice?.findPriceTaxDiscount;

  const restStatus = invoiceAllStatus?.filter(
    (status) => status?.id !== invoiceEditData?.[0]?.statusId
  );
  const currentStatus = invoiceAllStatus?.filter(
    (status) => status?.id === invoiceEditData?.[0]?.statusId
  );

  const handleUpdateInvoice = async (
    query: Partial<UpdateInvoiceQueryTypes>
  ) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Invoice Details",
        "Are you sure you want to save the changes you made? This action will update your Invoice Details.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateInvoice(
          invoiceEditData?.[0]?.id ?? 0,
          token ?? "",
          "invoice",
          query
        );

        // Revalidating the table to show updated data
        mutate(
          ["allInvoicePagination", pageIndex, token],
          async (cachedData) => {
            const updatedData = cachedData.filter(
              (invoice: AllInvoicesPaginationType) =>
                invoice.invoiceId !== invoiceId
            );
            return updatedData;
          }
        );
        // Revalidating also the actual data
        mutate(["invoiceSettings", token, invoiceId]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
        setPopupOpen((e) => !e);
        navigate("/invoices/all/");
        // }
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <EditInvoice
      handleUpdateInvoice={handleUpdateInvoice}
      invoiceStatusTaxDiscountPriceDataError={
        invoiceStatusTaxDiscountPriceDataError
      }
      invoiceStatusTaxDiscountPriceDataLoading={
        invoiceStatusTaxDiscountPriceDataLoading
      }
      invoiceAllStatus={restStatus}
      currentStatus={currentStatus}
      invoiceEditData={invoiceEditData}
    />
  );
};

export default InvoiceModify;
