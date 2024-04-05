import useSWR from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { useAuth } from "../../../helpers/useAuth";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface DetailItem {
  label: string;
  value: string | number | null | undefined;
}

const CompanyProfile: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/company-profile");
  };
  const { token } = useAuth();

  const {
    data: companyData,
    error: companyDataError,
    isLoading: companyDataLoading,
  } = useSWR<CompanyInfoTypes[]>(["companyData", token], () =>
    fetchCompanyInfo(token ?? "")
  );

  const companyDetails: DetailItem[] = companyData
    ? [
        { label: "Company Name", value: companyData[0]?.companyName ?? "N/A" },
        { label: "Country", value: companyData[0]?.country ?? "N/A" },
        { label: "City", value: companyData[0]?.city ?? "N/A" },
        { label: "ZipCode", value: companyData[0]?.zipcode ?? "N/A" },
        { label: "ID Number", value: companyData[0]?.idNumber ?? "N/A" },
      ]
    : [];

  const bankDetails: DetailItem[] = companyData
    ? [
        { label: "Bank Name", value: companyData[0]?.bankName ?? "N/A" },
        { label: "IBAN", value: companyData[0]?.iban ?? "N/A" },
        { label: "BIC", value: companyData[0]?.bic ?? "N/A" },
      ]
    : [];

  return (
    <div>
      <CompanyDetails
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        companyDetails={companyDetails}
        title="Company Details"
        navigateTo="edit-info"
        setPopupOpen={setPopupOpen}
      />
      <CompanyDetails
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        companyDetails={bankDetails}
        title="Bank Details"
        navigateTo="edit-bank"
        setPopupOpen={setPopupOpen}
      />

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
