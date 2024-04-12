import "../../../Styling/Pages/_editInfoCompany.scss";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import EditBankAccount from "../../../components/Settings/CompanyProfile/EditBankAccount";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { updateCompanyInfo } from "../../../api/companyInfoAPI";

const EditBankCompany: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const {
    data: companyData,
    error: companyDataError,
    isLoading: companyDataLoading,
  } = useSWR<CompanyInfoTypes[]>(["companyData", token]);

  const handleUpdate = async (id: number, query: Partial<CompanyInfoTypes>) => {
    try {
      console.log("query", query);
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Company Details",
        "Are you sure you want to save the changes you made? This action will update your Comapny Details.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateCompanyInfo(id, token ?? "", query);
        mutate(["companyData", token]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
        setPopupOpen((e) => !e);
        navigate("/settings/company-profile/");
      }
    } catch (err: unknown) {
      console.log("error", err);
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="editBankCompany">
      <EditBankAccount
        companyData={companyData}
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default EditBankCompany;
