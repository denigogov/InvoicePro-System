import React from "react";
import "../../../Styling/Pages/_editInfoCompany.scss";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import { CompanyInfoDetails } from "../../../types/companyInfoTypes";

interface EditCompanyDetailsProps {
  companyDataError: Error;
  companyDataLoading: boolean;
  companyData?: CompanyInfoDetails[];
  handleUpdate: (id: number, queryData: Partial<CompanyInfoDetails>) => void;
}

const EditCompanyDetails: React.FC<EditCompanyDetailsProps> = ({
  companyDataError,
  companyDataLoading,
  companyData,
  handleUpdate,
}) => {
  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(1, { companyName: "BadCompany GmbH" });
  };

  return (
    <div className="editInfoCompany">
      <p className="editInfoCompany__title">Company Details Update</p>
      <form onSubmit={handleForm} id="editCompanyForm">
        {companyData?.map((value) => (
          <React.Fragment key={value?.id}>
            <label>Company Name</label>
            <input type="text" defaultValue={value?.companyName ?? ""} />
            <label>Country</label>
            <input type="text" defaultValue={value?.country ?? ""} />
            <label>City</label>
            <input type="text" defaultValue={value?.city ?? ""} />
            <label>ZipCode</label>
            <input type="number" defaultValue={value?.zipcode ?? ""} />
            <label>ID Number</label>
            <input type="text" defaultValue={value?.idNumber ?? ""} />
          </React.Fragment>
        ))}
      </form>
      <button
        form="editCompanyForm"
        type="submit"
        className="action__button-global"
      >
        update
      </button>
    </div>
  );
};

export default EditCompanyDetails;
