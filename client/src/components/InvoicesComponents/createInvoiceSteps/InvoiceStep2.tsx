import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import Step2SearchCompany from "./Step2SearchCompany";
import { Step2initialDateTypes } from "./StepsInitialData";

type InvoiceStep2Props = Step2initialDateTypes & {
  updateFileds: (fileds: Partial<Step2initialDateTypes>) => void;
};

const InvoiceStep2: React.FC<InvoiceStep2Props> = ({
  customerName,
  country,
  city,
  street,
  zipcode,
  idNumber,
  updateFileds,
}) => {
  return (
    <MultiFormWraper
      title="Buyer Company"
      subTitle="Select the buyer's company from the list or enter new details"
    >
      {/* <Step2SearchCompany /> */}
      {/* styling inside of parrent scss file component  */}

      <label>Customer Name</label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => updateFileds({ customerName: e.target.value })}
      />
      <label>ID Number</label>
      <input
        type="text"
        value={idNumber}
        onChange={(e) => updateFileds({ idNumber: e.target.value })}
      />

      <label>Street</label>
      <input
        type="text"
        value={street}
        onChange={(e) => updateFileds({ street: e.target.value })}
      />

      <label>City</label>
      <input
        type="text"
        value={city}
        onChange={(e) => updateFileds({ city: e.target.value })}
      />
      <label>Zip Code</label>
      <input
        type="number"
        value={zipcode?.toString() ?? ""}
        onChange={(e) => updateFileds({ zipcode: +e.target.value })}
      />

      <label>Country</label>
      <input
        type="text"
        value={country}
        onChange={(e) => updateFileds({ country: e.target.value })}
      />
    </MultiFormWraper>
  );
};

export default InvoiceStep2;
