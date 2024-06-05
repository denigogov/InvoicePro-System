import useSWR, { mutate } from "swr";
import EditInput from "../../../components/GlobalComponents/EditInput";
import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { InvoiceSettingsTypes } from "../../../types/invoiceSettingsTypes";
import { useAuth } from "../../../helpers/useAuth";
import SettingsInfoSkeletonLoading from "../../../components/GlobalComponents/SkeletonLoading/SettingsInfoSkeletonLoading";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import { updateInvoiceSettings } from "../../../api/invoiceSettings";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";

const EditInvoiceSettings: React.FC = () => {
  const { token } = useAuth();

  const {
    data: allInvoiceSettings,
    error: allInvoiceSettingsError,
    isLoading: allInvoiceSettingsLoading,
  } = useSWR<InvoiceSettingsTypes[]>(["allInvoiceSettings", token]);

  const editInvoiceInputFileds: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Tax Rate %",
      name: "tax",
      type: "number",
      placeholder: "Enter tax rate (e.g., 5%)",
      maxNumber: 100,
      maxNumberMessage: "The tax rate cannot be more than 100%",
      step: 0.01,
      defaultValue: allInvoiceSettings?.[0].tax.toString() ?? "Data Not Found",
    },

    {
      id: 2,
      label: "Discount Rate %",
      name: "discount",
      type: "number",
      placeholder: "Discount rate (e.g., 10%)",
      maxNumber: 100,
      maxNumberMessage: "The Discount rate cannot be more than 100%",
      step: 0.01,
      defaultValue:
        allInvoiceSettings?.[0].discount.toString() ?? "Data Not Found",
    },
  ];

  const sendRequerst = async (query: InvoiceSettingsTypes) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Invoice Settings",
        "Are you sure you want to save the changes you made? This action will update your Invoice Settings.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateInvoiceSettings(
          allInvoiceSettings?.[0].id ?? null,
          token ?? "",
          query
        );
        mutate(["allInvoiceSettings", token]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  if (allInvoiceSettingsError)
    return (
      <ErrorMinimalDisplay errorMessage={allInvoiceSettingsError?.message} />
    );
  if (allInvoiceSettingsLoading) return <SettingsInfoSkeletonLoading />;

  return (
    <div className="editEmployer">
      <EditInput
        title="Invoice Settings Update"
        buttonName="Update"
        defaultInputValues={editInvoiceInputFileds}
        sendRequestFn={sendRequerst}
      />
    </div>
  );
};

export default EditInvoiceSettings;
