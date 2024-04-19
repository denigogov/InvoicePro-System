import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { Step3initialDateTypes } from "./StepsInitialData";

type InvoiceStep3Props = Step3initialDateTypes & {
  updateFileds: (fileds: Partial<Step3initialDateTypes>) => void;
};

const InvoiceStep3: React.FC<InvoiceStep3Props> = ({
  invoiceId,
  data,
  description,
  price,
  totalPrice,
  updateFileds,
}) => {
  return (
    <MultiFormWraper
      title=" Invoice Information"
      subTitle="Fill in the invoice details."
    >
      <>
        <label>Invoice ID</label>
        <input
          autoFocus
          type="text"
          value={invoiceId}
          onChange={(e) => updateFileds({ invoiceId: e.target.value })}
        />

        <label>Description</label>
        <textarea
          cols={40}
          rows={2}
          value={description}
          onChange={(e) => updateFileds({ description: e.target.value })}
        ></textarea>

        <label>Price</label>
        <input
          type="number"
          value={price?.toString() ?? ""}
          onChange={(e) => updateFileds({ price: +e.target.value })}
        />

        <label>Total Price</label>
        <input
          type="number"
          value={totalPrice?.toString() ?? ""}
          onChange={(e) => updateFileds({ totalPrice: +e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          value={data.toLocaleString()}
          onChange={(e) => updateFileds({ data: e.target.value })}
        />
      </>
    </MultiFormWraper>
  );
};

export default InvoiceStep3;
