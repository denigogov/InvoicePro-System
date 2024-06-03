import { mutate } from "swr";
import { updateUser } from "../../../api/userAPI";
import EditInput from "../../../components/GlobalComponents/EditInput";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { useAuth } from "../../../helpers/useAuth";
import {
  FetchAllUsersTypes,
  UpdateUserTypes,
} from "../../../types/userDataTypes";
import { editUserInput } from "./editUserInput";
import { useOutletContext } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

const EditUserProfile: React.FC = () => {
  const auth = useAuth();
  const userID = auth?.userInfo?.id ?? 1;
  const token = auth?.token;

  const currentUserData = useOutletContext<FetchAllUsersTypes>();

  const sendUpdatedUser = async (query: Partial<UpdateUserTypes>) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Account Details",
        "Are you sure you want to save the changes ?",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateUser(userID.toString(), token ?? "", query);
        mutate(["allUserData", token]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err as Error);
    }
  };

  const inputFileds = editUserInput([currentUserData]);

  return (
    // Styling in _employeesSettings.scss
    <div className="editEmployer">
      <EditInput
        title="Update Account Details"
        buttonName="Update"
        defaultInputValues={inputFileds}
        sendRequestFn={sendUpdatedUser}
      />
    </div>
  );
};

export default EditUserProfile;
