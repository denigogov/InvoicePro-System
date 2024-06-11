import React from "react";
import { INITIAL_DATA_STEP3_Types } from "../../../pages/Settings/employeesInfo/createEmployerInputs";
import EditInput from "../../GlobalComponents/EditInput";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";

type CreateEmplStep3Props = INITIAL_DATA_STEP3_Types & {
  updateFileds: (fileds: Partial<INITIAL_DATA_STEP3_Types>) => void;
};

const CreateEmplStep3: React.FC<CreateEmplStep3Props> = ({
  updateFileds,
  email,
  password,
}) => {
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: "Invalid email format",
    },

    {
      id: 4,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Add your password",
      pattern:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      patternMessage: `Password should be at least 6 characters and should include at least 1 letter, 1 number, and 1 special character`,
    },
    {
      id: 5,
      name: "confirm",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
    },
  ];

  return (
    <div>
      <MultiFormWraper
        title="Account Setup"
        subTitle="Provide an email address and set a password for the employer"
      >
        {inputs.map((arr) => (
          <React.Fragment key={arr.id}></React.Fragment>
        ))}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => updateFileds({ email: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => updateFileds({ password: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
        <label>Confirm Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => updateFileds({ password: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
      </MultiFormWraper>
    </div>
  );
};

export default CreateEmplStep3;
