import useSWR from "swr";
import { useParams } from "react-router-dom";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";
import { useAuth } from "../../../helpers/useAuth";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../../components/GlobalComponents/LoadingRing";
import EditInput from "../../../components/GlobalComponents/EditInput";
import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { fetchtStatusCountChart } from "../../../api/invoiceStatusAPI";
import { FetchtStatusCountChartTypes } from "../../../types/invoiceStatusTypes";

interface EditEmployerProps {}

const EditEmployer: React.FC<EditEmployerProps> = () => {
  const { token } = useAuth();
  const { id } = useParams();

  const {
    data: allUserData,
    error: allUserDataError,
    isLoading: allUserDataLoading,
  } = useSWR<FetchAllUsersTypes[]>(["allUserData", token]);

  const {
    data: allUserData1,
    error: allUserDataError1,
    isLoading: allUserDataLoading1,
  } = useSWR<FetchtStatusCountChartTypes[]>(["allUserDatas", token], () =>
    fetchtStatusCountChart(token ?? "")
  );

  if (allUserDataError1) return allUserDataError1.message;
  if (allUserDataLoading1) return <p>loading</p>;

  const userData = allUserData?.filter(
    (user) => user?.userId === Number(id) ?? 0
  );

  if (allUserDataError)
    return <ErrorMinimalDisplay errorMessage={allUserDataError?.messasge} />;

  if (allUserDataLoading) return <LoadingRing />;

  const defaultInputValues: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "First Name",
      name: "firstName",
      type: "text",
      defaultValue: userData?.[0].firstName ?? "",
      minLength: 3,
      maxLength: 30,
      minLengthMessage: "First Name should be min 3 letters",
      maxLengthMessage: "First Name should be max 30 letters",
    },

    {
      id: 2,
      name: "lastName",
      type: "text",
      label: "Last Name",
      defaultValue: userData?.[0].lastName ?? "",
      minLength: 3,
      maxLength: 30,
      minLengthMessage: "Last Name should be min 3 letters",
      maxLengthMessage: "Last Name5 should be max 30 letters",
    },

    {
      id: 3,
      name: "email",
      type: "email",
      label: "Email",
      defaultValue: userData?.[0].email ?? "",
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: "Invalid email format",
    },

    {
      id: 4,
      name: "department",
      type: "select",
      label: "Department",
      // options: [
      //   { value: 1, label: userData?.[0].departmentName ?? "" },
      //   { value: 2, label: "Driver" },
      // ],
      defaultSelectValue: {
        value: userData?.[0].departmentId ?? "",
        label: userData?.[0].departmentName ?? "",
      },
      options:
        allUserData1?.map((arr) => ({
          value: arr?.statusId,
          label: arr?.statusName ?? "hoho",
        })) || [],
    },
  ];

  return (
    <div className="editEmployer">
      <EditInput
        defaultInputValues={defaultInputValues}
        title="Employer Edit"
      />
    </div>
  );
};

export default EditEmployer;
