import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";
import { INITIAL_DATA_STEP1_Types } from "../../../pages/Settings/employeesInfo/createEmployerInputs";

import { AllDepartmentsTypes } from "../../../types/departmentTypes";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";

type CreateEmplStep1Props = INITIAL_DATA_STEP1_Types & {
  updateFileds: (fileds: Partial<INITIAL_DATA_STEP1_Types>) => void;
  allDepartmentsData?: AllDepartmentsTypes[];
  allDepartmentsDataLoading: boolean;
  allDepartmentsDataError: Error;
};

const CreateEmplStep1: React.FC<CreateEmplStep1Props> = ({
  updateFileds,
  departmentId,
  allDepartmentsData,
  allDepartmentsDataLoading,
  allDepartmentsDataError,
}) => {
  if (allDepartmentsDataLoading) return <LoadingRing />;
  if (allDepartmentsDataError)
    return (
      <ErrorMinimalDisplay errorMessage={allDepartmentsDataError?.message} />
    );
  return (
    <div>
      <MultiFormWraper
        title="Department Selection"
        subTitle="Choose the department from the list provided"
      >
        <label>Department</label>
        <select
          onChange={(e) => updateFileds({ departmentId: e.target.value })}
        >
          <option value="">Choose Department</option>
          {allDepartmentsData?.map((arr) => (
            <option key={arr?.id} value={arr?.id} defaultValue={departmentId}>
              {arr?.name}
            </option>
          ))}
        </select>
      </MultiFormWraper>
    </div>
  );
};

export default CreateEmplStep1;
