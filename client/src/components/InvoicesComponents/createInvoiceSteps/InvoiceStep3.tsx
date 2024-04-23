import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { Step3initialDateTypes } from "./StepsInitialData";

type InvoiceStep3Props = Step3initialDateTypes & {
  updateFileds: (fileds: Partial<Step3initialDateTypes>) => void;
  generateInvoiceID: string;
  lastInvoiceIdError: Error;
  lastInvoiceIdLoading: boolean;
};

const InvoiceStep3: React.FC<InvoiceStep3Props> = ({
  invoiceId,
  data,
  totalPrice,
  updateFileds,
  generateInvoiceID,
  lastInvoiceIdError,
  lastInvoiceIdLoading,
}) => {
  if (lastInvoiceIdError)
    return <ErrorMinimalDisplay errorMessage={lastInvoiceIdError?.message} />;
  if (lastInvoiceIdLoading) return <LoadingRing />;

  return (
    <MultiFormWraper
      title=" Invoice details"
      subTitle="Fill in the invoice details."
    >
      <>
        <label>Invoice ID</label>
        <input
          type="text"
          value={
            invoiceId
              ? invoiceId
              : generateInvoiceID
              ? generateInvoiceID
              : "2222"
          }
          maxLength={50}
          onChange={(e) => updateFileds({ invoiceId: e.target.value })}
        />

        <label>Total Price</label>
        <input
          autoFocus
          type="number"
          value={totalPrice?.toString() ?? ""}
          step={0.01}
          min={0}
          required
          onChange={(e) => updateFileds({ totalPrice: +e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          defaultValue={data.toLocaleString()}
          onChange={(e) => updateFileds({ data: e.target.value })}
        />
      </>
    </MultiFormWraper>
  );
};

export default InvoiceStep3;
