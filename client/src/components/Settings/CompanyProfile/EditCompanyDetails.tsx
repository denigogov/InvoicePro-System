import React, { useRef } from "react";
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
  const companyNameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipcodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const idNumberRef = useRef<HTMLInputElement>(null);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    const query: Partial<CompanyInfoDetails> = {};

    companyNameRef.current?.value !== companyData?.[0]?.companyName
      ? (query["companyName"] = companyNameRef.current?.value)
      : null;

    countryRef.current?.value !== companyData?.[0]?.country
      ? (query["country"] = countryRef.current?.value)
      : null;
    streetRef.current?.value !== companyData?.[0]?.street
      ? (query["street"] = streetRef.current?.value)
      : null;

    zipcodeRef.current?.value !== companyData?.[0]?.zipcode
      ? (query["zipcode"] = zipcodeRef.current?.value)
      : null;

    cityRef.current?.value !== companyData?.[0]?.city
      ? (query["city"] = cityRef.current?.value)
      : null;

    idNumberRef.current?.value !== companyData?.[0]?.idNumber
      ? (query["idNumber"] = idNumberRef.current?.value)
      : null;

    if (Object.keys(query).length) {
      handleUpdate(companyData?.[0]?.id ?? 0, query);
    }
  };

  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  return (
    <div className="editInfoCompany">
      <p className="editInfoCompany__title">Company Details Update</p>
      <form onSubmit={handleForm} id="editCompanyForm">
        {companyData?.map((value) => (
          <React.Fragment key={value?.id}>
            <label>Company Name</label>
            <input
              ref={companyNameRef}
              type="text"
              defaultValue={value?.companyName ?? ""}
              minLength={3}
              maxLength={40}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>

            <label>Street</label>
            <input
              ref={streetRef}
              type="text"
              defaultValue={value?.street ?? ""}
              minLength={3}
              maxLength={60}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>

            <label>City</label>
            <input
              ref={cityRef}
              type="text"
              defaultValue={value?.city ?? ""}
              minLength={3}
              maxLength={20}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>

            <label>ZipCode</label>
            <input
              ref={zipcodeRef}
              type="string"
              defaultValue={value?.zipcode ?? ""}
              minLength={4}
              maxLength={10}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>

            <label>Country</label>
            <input
              ref={countryRef}
              type="text"
              defaultValue={value?.country ?? ""}
              minLength={3}
              maxLength={15}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              focused="true"
            />
            <span></span>

            <label>ID Number</label>
            <input
              ref={idNumberRef}
              type="text"
              defaultValue={value?.idNumber ?? ""}
              minLength={4}
              maxLength={20}
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

export default EditCompanyDetails;
