import { INITIAL_DATA_STEP2_Types } from "../../../pages/Settings/employeesInfo/createEmployerInputs";
import EditInput from "../../GlobalComponents/EditInput";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";

type CreateEmplStep2Props = INITIAL_DATA_STEP2_Types & {
  updateFileds: (fileds: Partial<INITIAL_DATA_STEP2_Types>) => void;
};

const CreateEmplStep2: React.FC<CreateEmplStep2Props> = ({
  updateFileds,
  firstName,
  lastName,
}) => {
  const inputs = [
    {
      id: 1,
      label: "First Name",
      name: "firstName",
      type: "text",
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
      minLength: 3,
      maxLength: 30,
      minLengthMessage: "Last Name should be min 3 letters",
      maxLengthMessage: "Last Name5 should be max 30 letters",
    },
  ];

  return (
    <div>
      <MultiFormWraper
        title="Personal Information"
        subTitle="Fill in the personal details of the employer"
      >
        {" "}
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => updateFileds({ firstName: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => updateFileds({ lastName: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
      </MultiFormWraper>
    </div>
  );
};

export default CreateEmplStep2;
