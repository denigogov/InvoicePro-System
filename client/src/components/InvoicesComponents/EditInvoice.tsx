import { useRef } from "react";
import {
  FetchAllInvoiceStatusTypes,
  findTaxPriceDiscountStatus,
} from "../../types/invoiceStatusTypes";
import ErrorMinimalDisplay from "../GlobalComponents/ErrorMinimalDisplay";
import InputFields from "../GlobalComponents/InputFields";
import LoadingRing from "../GlobalComponents/LoadingRing";
import { UpdateInvoiceQueryTypes } from "../../pages/Invoices/allInvoices/InvoiceModify";

interface EditInvoiceProps {
  handleUpdateInvoice: (e: Partial<UpdateInvoiceQueryTypes>) => void;
  invoiceStatusTaxDiscountPriceDataLoading: boolean;
  invoiceStatusTaxDiscountPriceDataError: Error;
  currentStatus: (FetchAllInvoiceStatusTypes | undefined)[] | undefined;
  invoiceAllStatus: (FetchAllInvoiceStatusTypes | undefined)[] | undefined;
  invoiceEditData: (findTaxPriceDiscountStatus | undefined)[] | undefined;
}

const EditInvoice: React.FC<EditInvoiceProps> = ({
  handleUpdateInvoice,
  invoiceStatusTaxDiscountPriceDataLoading,
  invoiceStatusTaxDiscountPriceDataError,
  invoiceAllStatus,
  invoiceEditData,
  currentStatus,
}) => {
  const totalPriceRef = useRef<HTMLInputElement>(null);
  const taxRef = useRef<HTMLInputElement>(null);
  const dicountRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const query: Partial<UpdateInvoiceQueryTypes> = {};

    totalPriceRef.current?.value !== invoiceEditData?.[0]?.totalPrice
      ? (query["totalPrice"] = totalPriceRef.current?.value)
      : null;
    taxRef.current?.value !== invoiceEditData?.[0]?.tax
      ? (query["tax"] = taxRef.current?.value)
      : null;
    dicountRef.current?.value !== invoiceEditData?.[0]?.discount
      ? (query["discount"] = dicountRef.current?.value)
      : null;
    statusRef.current?.value !== invoiceEditData?.[0]?.statusId
      ? (query["statusId"] = statusRef.current?.value)
      : null;

    if (Object.keys(query).length) {
      handleUpdateInvoice(query);
    }
  };

  if (invoiceStatusTaxDiscountPriceDataError)
    return (
      <ErrorMinimalDisplay
        errorMessage={invoiceStatusTaxDiscountPriceDataError?.message}
      />
    );

  if (invoiceStatusTaxDiscountPriceDataLoading) return <LoadingRing />;

  return (
    <InputFields title={"Invoice Details Modify"}>
      <label>Invoice Status</label>
      <select ref={statusRef}>
        <option value={currentStatus?.[0]?.id}>
          {currentStatus?.[0]?.statusName}
        </option>
        {invoiceAllStatus?.map((status) => (
          <option key={status?.id} value={status?.id}>
            {status?.statusName ?? ""}
          </option>
        ))}
      </select>
      <span></span>
      <label>Total Price</label>
      <input
        type="text"
        defaultValue={invoiceEditData?.[0]?.totalPrice}
        minLength={2}
        ref={totalPriceRef}
      />
      <span></span>
      <label>Tax</label>
      <input
        defaultValue={invoiceEditData?.[0]?.tax}
        type="text"
        minLength={2}
        ref={taxRef}
      />
      <span></span>
      <label>Discount</label>
      <input
        type="text"
        defaultValue={invoiceEditData?.[0]?.discount}
        minLength={2}
        ref={dicountRef}
      />
      <span></span>

      <button
        form="editCompanyForm"
        type="submit"
        className="action__button-global"
        onClick={handleSubmitForm}
      >
        update
      </button>
    </InputFields>
  );
};

export default EditInvoice;
