import useSWR from "swr";
import { fetchStatusPriceTaxDiscount } from "../../../api/invoiceStatusAPI";
import EditInvoice from "../../../components/InvoicesComponents/EditInvoice";
import "../../../Styling/Components/GlobalComponentStyle/_inputFileds.scss";
import { useAuth } from "../../../helpers/useAuth";
import { SelectStatusAndPrice } from "../../../types/invoiceStatusTypes";
import { useParams } from "react-router-dom";

const InvoiceModify: React.FC = () => {
  const { token } = useAuth();
  const { invoiceId } = useParams();

  const {
    data: invoiceStatusTaxDiscountPrice,
    error: invoiceStatusTaxDiscountPriceDataError,
    isLoading: invoiceStatusTaxDiscountPriceDataLoading,
  } = useSWR<SelectStatusAndPrice>(["invoiceSettings", token, invoiceId], () =>
    fetchStatusPriceTaxDiscount(token ?? "", invoiceId)
  );

  const invoiceAllStatus = invoiceStatusTaxDiscountPrice?.selectAllStatus;
  const invoiceEditData = invoiceStatusTaxDiscountPrice?.findPriceTaxDiscount;

  const updateInvoice = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <EditInvoice
      updateInvoice={updateInvoice}
      invoiceStatusTaxDiscountPriceDataError={
        invoiceStatusTaxDiscountPriceDataError
      }
      invoiceStatusTaxDiscountPriceDataLoading={
        invoiceStatusTaxDiscountPriceDataLoading
      }
      invoiceAllStatus={invoiceAllStatus}
      invoiceEditData={invoiceEditData}
    />
  );
};

export default InvoiceModify;
