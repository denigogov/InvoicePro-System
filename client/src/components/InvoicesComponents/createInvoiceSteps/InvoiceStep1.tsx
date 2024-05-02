import "../../../Styling/Components/InvoiceComponentStyle/_invoiceStep1.scss";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import React from "react";

interface InvoiceStep1Props {
  companyDataLoading: boolean;
  companyDataError: Error;
  companyData?: CompanyInfoTypes[];
  companyId: number | null;
  setCompanyId: React.Dispatch<React.SetStateAction<number | null>>;
  filteredCompanyData?: CompanyInfoTypes[];
}

const InvoiceStep1: React.FC<InvoiceStep1Props> = ({
  companyData,
  companyDataError,
  companyDataLoading,
  companyId,
  setCompanyId,
  filteredCompanyData,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(parseInt(event.target.value, 0));
  };

  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  return (
    <div className="invoiceStep1">
      <MultiFormWraper
        title="Seller Company"
        subTitle="Choose the company data from the list provided"
      >
        <div>
          <select
            onChange={handleSelectChange}
            defaultValue={companyId ? companyId : 0}
          >
            <option>choose company</option>
            {companyData?.map((comapany) => (
              <option
                onClick={() => setCompanyId(comapany?.id)}
                key={comapany?.id}
                value={comapany?.id}
              >
                {comapany?.companyName ?? "no data found"}
              </option>
            ))}
          </select>

          <div className="invoiceStep1__details">
            {filteredCompanyData?.map((data) => (
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
    </div>
  );
};

export default InvoiceStep1;
