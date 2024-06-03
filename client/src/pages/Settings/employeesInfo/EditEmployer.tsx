import useSWR, { mutate } from "swr";
import { useParams } from "react-router-dom";
import {
  FetchAllUsersTypes,
  UpdateUserTypes,
} from "../../../types/userDataTypes";
import { useAuth } from "../../../helpers/useAuth";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../../components/GlobalComponents/LoadingRing";
import EditInput from "../../../components/GlobalComponents/EditInput";
import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { fetchAllDepartments } from "../../../api/departmentAPI";
import { AllDepartmentsTypes } from "../../../types/departmentTypes";
import { updateUser } from "../../../api/userAPI";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { generateDefaultInputValues } from "./editUserInput";

interface EditEmployerProps {}

// Styling in _employeesSettings

const EditEmployer: React.FC<EditEmployerProps> = () => {
  const { token } = useAuth();
  const { id } = useParams();

  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token]);

  const {
    data: allDepartmentsData,
    error: allDepartmentsDataError,
    isLoading: allDepartmentsDataLoading,
  } = useSWR<AllDepartmentsTypes[]>(["allDepartmentsData", token], () =>
    fetchAllDepartments(token ?? "")
  );

  if (allDepartmentsDataError) return allDepartmentsDataError.message;
  if (allDepartmentsDataLoading) return <p>loading</p>;

  const userData = allUserData?.filter(
    (user) => user?.userId === Number(id) ?? 0
  );

  if (allUserDataError || allDepartmentsDataError)
    return (
      <ErrorMinimalDisplay
        errorMessage={
          allUserDataError?.messasge || allDepartmentsDataError?.message
        }
      />
    );

  if (allUserDataLoading || allDepartmentsDataLoading) return <LoadingRing />;

  const defaultInputValues: DefaultInputValuesTypes[] =
    generateDefaultInputValues(userData ?? [], allDepartmentsData ?? []);

  const sendUpdatedUser = async (query: Partial<UpdateUserTypes>) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Employer Details",
        "Are you sure you want to save the changes to this employer's details?",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateUser(id, token ?? "", query);
        mutate(["allUserData", token]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err as Error);
    }
  };

  return (
    <div className="editEmployer">
      <EditInput
        defaultInputValues={defaultInputValues}
        title="Employer Edit"
        buttonName="Update"
        sendRequestFn={sendUpdatedUser}
      />
    </div>
  );
};

export default EditEmployer;
