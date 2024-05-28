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

  console.log(allUserData);

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
      name: "firstName",
      type: "text",
      required: false,
      defaultValue: userData?.[0].firstName ?? "",
      minLength: 3,
      maxLength: 20,
      pattern: "",
      label: "First Name",
      minLengthMessage: "Lenght should be min 3 letters",
      maxLengthMessage: "Lenght should be max 20 letters",
    },

    {
      id: 2,
      name: "lastName",
      type: "text",
      required: false,
      defaultValue: userData?.[0].lastName ?? "",
      minLength: null,
      maxLength: null,
      pattern: "",
      label: "Last Name",
    },

    {
      id: 3,
      name: "email",
      type: "email",
      label: "Email",
      required: false,
      defaultValue: userData?.[0].email ?? "",
      minLength: 3,
      pattern: "",
    },

    {
      id: 4,
      name: "department",
      type: "select",
      required: false,
      defaultValue: "",
      label: "Department",
      // options: [
      //   { value: 1, label: userData?.[0].departmentName ?? "" },
      //   { value: 2, label: "Driver" },
      // ],
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
