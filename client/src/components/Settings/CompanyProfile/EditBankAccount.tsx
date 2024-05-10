import React, { useRef } from "react";
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
  const bankNameRef = useRef<HTMLInputElement>(null);
  const ibanRef = useRef<HTMLInputElement>(null);
  const bicRef = useRef<HTMLInputElement>(null);

  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query: Partial<CompanyBankInfo> = {};

    bankNameRef.current?.value !== companyData?.[0]?.bankName
      ? (query.bankName = bankNameRef.current?.value)
      : null;

    ibanRef.current?.value !== companyData?.[0]?.iban
      ? (query.iban = ibanRef.current?.value)
      : null;

    bicRef.current?.value !== companyData?.[0]?.bic
      ? (query.bic = bicRef.current?.value)
      : null;

    if (Object.keys(query).length) {
      handleUpdate(companyData?.[0]?.id ?? 0, query);
    }
    return;
  };

  return (
    <div className="editInfoCompany">
      <p className="editInfoCompany__title">Company Details Update</p>
      <form onSubmit={handleSubmit} id="editCompanyForm">
        {companyData?.map((value) => (
          <React.Fragment key={value?.id}>
            <label>Bank Name</label>
            <input
              type="text"
              ref={bankNameRef}
              defaultValue={value?.bankName ?? ""}
              minLength={3}
              maxLength={20}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>
            <label>IBAN</label>
            <input
              ref={ibanRef}
              style={{ fontSize: ".9rem" }}
              type="text"
              defaultValue={value?.iban ?? ""}
              minLength={15}
              maxLength={40}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>
            <label>BIC</label>
            <input
              ref={bicRef}
              type="text"
              defaultValue={value?.bic ?? ""}
              minLength={8}
              maxLength={11}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>
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
