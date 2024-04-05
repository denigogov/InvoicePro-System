import React from "react";
import { CompanyBankInfo } from "../../../types/companyInfoTypes";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";

interface EditBankAccountProps {
  companyDataError: Error;
  companyDataLoading: boolean;
  companyData?: CompanyBankInfo[];
  handleUpdate: (id: number, queryData: Partial<CompanyBankInfo>) => void;
}

const EditBankAccount: React.FC<EditBankAccountProps> = ({
  companyDataError,
  companyDataLoading,
  companyData,
  handleUpdate,
}) => {
  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = {
      bic: "VMRO1234",
    };

    handleUpdate(1, query);
  };

  return (
    <div className="editInfoCompany">
      <p className="editInfoCompany__title">Company Details Update</p>
      <form onSubmit={handleSubmit} id="editCompanyForm">
        {companyData?.map((value) => (
          <React.Fragment key={value?.id}>
            <label>Bank Name</label>
            <input type="text" defaultValue={value?.bankName ?? ""} />
            <label>IBAN</label>
            <input
              style={{ fontSize: ".9rem" }}
              type="text"
              defaultValue={value?.iban ?? ""}
            />
            <label>BIC</label>
            <input type="text" defaultValue={value?.bic ?? ""} />
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

export default EditBankAccount;
