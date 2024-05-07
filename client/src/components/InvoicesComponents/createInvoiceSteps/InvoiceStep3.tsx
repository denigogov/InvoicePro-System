import { InvoiceSettingsTypes } from "../../../types/invoiceSettingsTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { Step3initialDateTypes } from "./StepsInitialData";

type InvoiceStep3Props = Step3initialDateTypes & {
  updateFileds: (fileds: Partial<Step3initialDateTypes>) => void;
  generateInvoiceID: string;
  lastInvoiceIdError: Error;
  invoiceSettingsDataError: Error;
  lastInvoiceIdLoading: boolean;
  invoiceSettingsDataLoading: boolean;
  invoiceSettingsData?: InvoiceSettingsTypes[];
};

const InvoiceStep3: React.FC<InvoiceStep3Props> = ({
  invoiceId,
  data,
  tax,
  discount,
  updateFileds,
  generateInvoiceID,
  lastInvoiceIdError,
  lastInvoiceIdLoading,
  invoiceSettingsDataLoading,
  invoiceSettingsDataError,
  invoiceSettingsData,
}) => {
  if (lastInvoiceIdError || invoiceSettingsDataError)
    return (
      <ErrorMinimalDisplay
        errorMessage={
          lastInvoiceIdError?.message || invoiceSettingsDataError?.message
        }
      />
    );
  if (lastInvoiceIdLoading || invoiceSettingsDataLoading)
    return <LoadingRing />;

  console.log("taksi", tax);

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

        <label>Tax %</label>
        <input
          autoFocus
          type="number"
          // value={+tax}
          defaultValue={invoiceSettingsData?.[0].tax ?? tax?.toFixed(2)}
          step={0.01}
          min={0}
          onChange={(e) => updateFileds({ tax: +e.target.value })}
        />

        <label>Discount %</label>
        <input
          autoFocus
          type="number"
          defaultValue={
            invoiceSettingsData?.[0].discount ?? discount?.toFixed(2)
          }
          // value={10}
          step={0.01}
          min={0}
          onChange={(e) => updateFileds({ discount: +e.target.value })}
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
