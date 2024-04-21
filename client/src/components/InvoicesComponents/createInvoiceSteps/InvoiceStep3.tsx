import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { Step3initialDateTypes } from "./StepsInitialData";

type InvoiceStep3Props = Step3initialDateTypes & {
  updateFileds: (fileds: Partial<Step3initialDateTypes>) => void;
};

const InvoiceStep3: React.FC<InvoiceStep3Props> = ({
  invoiceId,
  data,
  totalPrice,
  updateFileds,
}) => {
  return (
    <MultiFormWraper
      title=" Invoice details"
      subTitle="Fill in the invoice details."
    >
      <>
        <label>Invoice ID</label>
        <input
          autoFocus
          type="text"
          value={invoiceId}
          maxLength={50}
          onChange={(e) => updateFileds({ invoiceId: e.target.value })}
        />

        <label>Total Price</label>
        <input
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
