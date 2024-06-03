import { useState } from "react";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const InvoiceSettings: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);

  const navigator = useNavigate();
  const location = useLocation();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/invoices");
  };

  const userDetails = [
    { label: "Tax Default Rate", value: "20 %" },
    { label: "Discount Default Rate", value: "10 %" },
  ];

  return (
    <div className="width500">
      <CompanyDetails
        // companyDataError={allUserDataError}
        // companyDataLoading={allUserDataLoading}
        companyDetails={userDetails}
        title="Invoice Settings"
        navigateTo={`${
          location.pathname === "/settings" ? "invoices" : `edit/`
        }`}
        setPopupOpen={setPopupOpen}
      />

      <p className="NoteMessage">
        Note: The data for this component is currently hardcoded. Live data
        integration is in progress
      </p>

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp smPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default InvoiceSettings;
