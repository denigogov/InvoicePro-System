import { useState } from "react";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchInvoiceSettings } from "../../../api/invoiceSettings";
import { useAuth } from "../../../helpers/useAuth";
import { InvoiceSettingsTypes } from "../../../types/invoiceSettingsTypes";
import useSWR from "swr";
// import PromptMessageTest from "../../../components/GlobalComponents/PromptMessageTest";

const InvoiceSettings: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);

  const navigator = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/invoices");
  };

  const {
    data: allInvoiceSettings,
    error: allInvoiceSettingsError,
    isLoading: allInvoiceSettingsLoading,
  } = useSWR<InvoiceSettingsTypes[]>(["allInvoiceSettings", token], () =>
    fetchInvoiceSettings(token ?? "")
  );

  const userDetails = [
    {
      label: "Tax Default Rate",
      value: `${allInvoiceSettings?.[0].tax ?? "Data Not Found"} %`,
    },
    {
      label: "Discount Default Rate",
      value: `${allInvoiceSettings?.[0].discount ?? "Data Not Found"} %`,
    },
  ];

  return (
    <div className="width500">
      <CompanyDetails
        companyDataError={allInvoiceSettingsError}
        companyDataLoading={allInvoiceSettingsLoading}
        companyDetails={userDetails}
        title="Invoice Settings"
        navigateTo={`${
          location.pathname === "/settings" ? "invoices" : `edit/`
        }`}
        setPopupOpen={setPopupOpen}
      />

      {/* <p className="NoteMessage">
        Note: The data for this component is currently hardcoded. Live data
        integration is in progress
      </p> */}

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp smPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </main>
        </div>
      )}
    </div>

    // <div>
    //   <PromptMessageTest />
    // </div>
  );
};

export default InvoiceSettings;
