import React from "react";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { INITIAL_DATA_STEP2, Step2initialDateTypes } from "./StepsInitialData";

interface InvoiceStep2SearchProps {
  buyerId: number | null;
  setBuyerId: React.Dispatch<React.SetStateAction<number | null>>;
  setCreateBuyer: React.Dispatch<React.SetStateAction<boolean>>;
  customerDataLoading: boolean;
  customerDataError: Error;
  customerData?: AllCustomerTypes[];
  setBuyerCompanyData: React.Dispatch<
    React.SetStateAction<Step2initialDateTypes>
  >;
}

const InvoiceStep2Search: React.FC<InvoiceStep2SearchProps> = ({
  buyerId,
  setBuyerId,
  customerDataLoading,
  customerDataError,
  customerData,
  setCreateBuyer,
  setBuyerCompanyData,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBuyerId(parseInt(event.target.value, 0));
  };

  const filteredData = customerData?.filter(
    (company) => company?.id === buyerId
  );

  const handleCreateBuyer = () => {
    setCreateBuyer((e) => !e);
    setBuyerId(null);

    // In case user decide to select the company from the list  instead creating new one , inserted data will be cleared!
    buyerId ? setBuyerCompanyData(INITIAL_DATA_STEP2) : buyerId;
  };

  if (customerDataError)
    return <ErrorMinimalDisplay errorMessage={customerDataError?.message} />;
  if (customerDataLoading) return <LoadingRing />;

  return (
    <MultiFormWraper
      title="Buyer Company"
      subTitle="Select the buyer's company from the list or enter new details"
    >
      <div>
        {/* Styling in _InvoiceStep1 */}
        <div className="step2Search">
          <select
            onChange={handleSelectChange}
            defaultValue={buyerId ? buyerId : 0}
          >
            <option>choose buyer</option>
            {customerData?.map((arr) => (
              <option key={arr.id} value={arr?.id}>
                {arr?.customerName ?? "Not Found"}
              </option>
            ))}
          </select>

          <p onClick={handleCreateBuyer}>create buyer company</p>
        </div>

        <div className="invoiceStep1__details">
          {filteredData?.map((data) => (
            <React.Fragment key={data.id}>
              {Object.entries(data).map(([key, value]) => (
                <p key={key}>
                  <span>{key}</span>: {value}
                </p>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MultiFormWraper>
  );
};

export default InvoiceStep2Search;
