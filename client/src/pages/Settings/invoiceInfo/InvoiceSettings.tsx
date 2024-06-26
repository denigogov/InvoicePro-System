import { useState } from "react";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchInvoiceSettings } from "../../../api/invoiceSettings";
import { useAuth } from "../../../helpers/useAuth";
import { InvoiceSettingsTypes } from "../../../types/invoiceSettingsTypes";
import useSWR, { useSWRConfig } from "swr";
import {
  fetchAllInvoiceStatus,
  updateInvoiceStatus,
} from "../../../api/invoiceStatusAPI";
import { FetchAllInvoiceStatusTypes } from "../../../types/invoiceStatusTypes";
import EditInputNoPopup, {
  userDataValuesType,
} from "../../../components/GlobalComponents/EditInputNoPopup";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
// import PromptMessageTest from "../../../components/GlobalComponents/PromptMessageTest";

const InvoiceSettings: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);

  const navigator = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { mutate } = useSWRConfig();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/invoices");
  };

  const {
    data: allInvoiceStatus,
    error: allInvoiceStatusError,
    isLoading: allInvoiceStatusLoading,
  } = useSWR<FetchAllInvoiceStatusTypes[]>(["allInvoiceStatus", token], () =>
    fetchAllInvoiceStatus(token ?? "")
  );

  const {
    data: allInvoiceSettings,
    error: allInvoiceSettingsError,
    isLoading: allInvoiceSettingsLoading,
  } = useSWR<InvoiceSettingsTypes[]>(["allInvoiceSettings", token], () =>
    fetchInvoiceSettings(token ?? "")
  );

  const invoiceSettings = [
    {
      label: "Tax Default Rate",
      value: `${allInvoiceSettings?.[0].tax ?? "Data Not Found"} %`,
    },
    {
      label: "Discount Default Rate",
      value: `${allInvoiceSettings?.[0].discount ?? "Data Not Found"} %`,
    },
  ];

  const statusValues = allInvoiceStatus?.map((arr) => {
    const values = {
      type: "text",
      id: arr?.id ?? null,
      value: arr?.statusName,
      placeholder: "Status Name",
      defaultData: arr?.statusName,
    };

    return values;
  });

  const sendRequest = async (query: Partial<userDataValuesType>) => {
    const value = {
      statusName: query?.value,
    };
    const id = query?.id;
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Invoice Status",
        "Confirm change: Update invoice status?",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateInvoiceStatus(id ?? null, token ?? "", value);
        mutate(["allInvoiceStatus", token]);
        updateActionPrompt("Great!", "Your Updates has been saved");
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err as Error);
    }
  };

  return (
    <div className="width500">
      <EditInputNoPopup
        title="Invoice Status"
        userData={statusValues}
        dataLoading={allInvoiceStatusLoading}
        dataError={allInvoiceStatusError}
        handleUpdateFn={sendRequest}
      />

      <CompanyDetails
        companyDataError={allInvoiceSettingsError}
        companyDataLoading={allInvoiceSettingsLoading}
        companyDetails={invoiceSettings}
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
