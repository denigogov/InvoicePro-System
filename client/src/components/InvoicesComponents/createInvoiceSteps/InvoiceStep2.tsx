import { useState } from "react";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import InvoiceStep2Search from "./InvoiceStep2Search";
import { Step2initialDateTypes } from "./StepsInitialData";

type InvoiceStep2Props = Step2initialDateTypes & {
  updateFileds: (fileds: Partial<Step2initialDateTypes>) => void;
  buyerId: number | null;
  setBuyerId: React.Dispatch<React.SetStateAction<number | null>>;
  customerDataLoading: boolean;
  customerDataError: Error;
  customerData?: AllCustomerTypes[];
  setBuyerCompanyData: React.Dispatch<
    React.SetStateAction<Step2initialDateTypes>
  >;
};

const InvoiceStep2: React.FC<InvoiceStep2Props> = ({
  customerName,
  country,
  city,
  street,
  zipcode,
  idNumber,
  updateFileds,
  buyerId,
  setBuyerId,
  customerDataLoading,
  customerDataError,
  customerData,
  setBuyerCompanyData,
}) => {
  const [createBuyer, setCreateBuyer] = useState<boolean>(false);

  return (
    <>
      {!createBuyer && (
        <InvoiceStep2Search
          buyerId={buyerId}
          setBuyerId={setBuyerId}
          customerDataLoading={customerDataLoading}
          customerDataError={customerDataError}
          customerData={customerData}
          setCreateBuyer={setCreateBuyer}
          setBuyerCompanyData={setBuyerCompanyData}
        />
      )}

      {(createBuyer || !customerData?.length) && (
        <MultiFormWraper
          title="Buyer Company"
          subTitle="Select the buyer's company from the list or enter new details"
        >
          {/* <Step2SearchCompany /> */}
          {/* styling inside of parrent scss file component  */}

          <label>Customer Name</label>
          <input
            autoFocus
            type="text"
            value={customerName}
            onChange={(e) => updateFileds({ customerName: e.target.value })}
            minLength={3}
            maxLength={50}
            required
          />
          <label>ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => updateFileds({ idNumber: e.target.value })}
            minLength={3}
            maxLength={50}
            required
          />

          <label>Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => updateFileds({ street: e.target.value })}
            minLength={3}
            maxLength={100}
          />

          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => updateFileds({ city: e.target.value })}
            minLength={3}
            maxLength={30}
          />
          <label>Zip Code</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => updateFileds({ zipcode: e.target.value })}
            maxLength={10}
          />

          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => updateFileds({ country: e.target.value })}
            minLength={3}
            maxLength={30}
            required
          />
        </MultiFormWraper>
      )}
    </>
  );
};

export default InvoiceStep2;
