import useSWR, { mutate } from "swr";
import EditCompanyDetails from "../../../components/Settings/CompanyProfile/EditCompanyDetails";
import { useAuth } from "../../../helpers/useAuth";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import { useNavigate, useOutletContext } from "react-router-dom";
import { updateCompanyInfo } from "../../../api/companyInfoAPI";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

interface EditInfoCompanyProps {}

const EditInfoCompany: React.FC<EditInfoCompanyProps> = ({}) => {
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
    <div className="editInfoCompany">
      <EditCompanyDetails
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        companyData={companyData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default EditInfoCompany;
