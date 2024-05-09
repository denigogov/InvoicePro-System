import {
  FetchAllInvoiceStatusTypes,
  findTaxPriceDiscountStatus,
} from "../../types/invoiceStatusTypes";
import ErrorMinimalDisplay from "../GlobalComponents/ErrorMinimalDisplay";
import InputFields from "../GlobalComponents/InputFields";
import LoadingRing from "../GlobalComponents/LoadingRing";

interface EditInvoiceProps {
  updateInvoice: (e: any) => void;
  invoiceStatusTaxDiscountPriceDataLoading: boolean;
  invoiceStatusTaxDiscountPriceDataError: Error;
  invoiceAllStatus: (FetchAllInvoiceStatusTypes | undefined)[] | undefined;
  invoiceEditData: (findTaxPriceDiscountStatus | undefined)[] | undefined;
}

const EditInvoice: React.FC<EditInvoiceProps> = ({
  updateInvoice,
  invoiceStatusTaxDiscountPriceDataLoading,
  invoiceStatusTaxDiscountPriceDataError,
  invoiceAllStatus,
  invoiceEditData,
}) => {
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
      <select>
        {invoiceAllStatus?.map((status) => (
          <option key={status?.id} value={status?.id}>
            {status?.statusName ?? ""}
          </option>
        ))}
      </select>
      <span></span>
      <label>Total Price</label>
      <input
        style={{ fontSize: ".9rem" }}
        type="text"
        defaultValue={invoiceEditData?.[0]?.totalPrice}
        minLength={15}
        maxLength={40}
      />
      <span></span>
      <label>Tax</label>
      <input
        defaultValue={invoiceEditData?.[0]?.tax}
        type="text"
        minLength={8}
        maxLength={11}
      />
      <span></span>
      <label>Discount</label>
      <input
        type="text"
        defaultValue={invoiceEditData?.[0]?.discount}
        minLength={8}
        maxLength={11}
      />
      <span></span>

      <button
        form="editCompanyForm"
        type="submit"
        className="action__button-global"
      >
        update
      </button>
    </InputFields>
  );
};

export default EditInvoice;
