import { useParams } from "react-router-dom";
import EditInput from "../../../components/GlobalComponents/EditInput";
import { customerInputs } from "./EditInputs";
import {
  fetchCustomerData,
  updateCustomerData,
} from "../../../api/customerAPI";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import { useAuth } from "../../../helpers/useAuth";
import useSWR, { mutate } from "swr";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import TableSkeletonLoading from "../../../components/GlobalComponents/SkeletonLoading/TableSkeletonLoading";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";

interface EditCustomerProps {}

const EditCustomer: React.FC<EditCustomerProps> = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const {
    data: singleCustomerData,
    error: singleCustomerDataError,
    isLoading: singleCustomerDataLoading,
  } = useSWR<AllCustomerTypes[]>(["singleCustomer", token, id], () =>
    fetchCustomerData(token ?? "", id)
  );

  if (singleCustomerDataError)
    return (
      <ErrorMinimalDisplay errorMessage={singleCustomerDataError?.message} />
    );
  if (singleCustomerDataLoading) return <TableSkeletonLoading />;

  const inputValues = customerInputs(singleCustomerData ?? []);

  const submitUpdateCustomer = async (query: Partial<AllCustomerTypes>) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Confirm Update",
        "Are you sure you want to save the changes you made? This action will update your Customer Data",
        "Update Now"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateCustomerData(id ?? "", token ?? "", query);
        mutate(["allCustomers", token]);
        updateActionPrompt("Great!", "Your Updates has been saved");
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };
  return (
    <div className="popupScroll">
      <EditInput
        buttonName="Update"
        title="Customers Edit"
        defaultInputValues={inputValues}
        sendRequestFn={submitUpdateCustomer}
      />
    </div>
  );
};

export default EditCustomer;
