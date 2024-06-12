import React, { useState } from "react";
import {
  FormInputs,
  INITIAL_DATA_STEP2_Types,
  inputStep2,
} from "../../../pages/Settings/employeesInfo/createEmployerInputs";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";

type CreateEmplStep2Props = INITIAL_DATA_STEP2_Types & {
  updateFileds: (fields: Partial<INITIAL_DATA_STEP2_Types>) => void;
  showInputErrors: (fields: FormInputs[]) => Record<string, string>;
};

const CreateEmplStep2: React.FC<CreateEmplStep2Props> = ({
  updateFileds,
  showInputErrors,
  firstName,
  lastName,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const inputs = inputStep2(firstName, lastName);
  const errorMessages: Record<string, string> = showInputErrors(inputs);

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (name: string, value: string) => {
    updateFileds({ [name]: value });
  };

  return (
    <div>
      <MultiFormWraper
        title="Personal Information"
        subTitle="Fill in the personal details of the employer"
      >
        {inputs.map((arr) => (
          <React.Fragment key={arr.id}>
            <label>{arr.label}</label>
            <input
              type={arr.type}
              value={arr.value}
              name={arr.name}
              onChange={(e) => handleChange(arr.name, e.target.value)}
              minLength={arr.minLength}
              maxLength={arr.maxLength}
              required={arr.required}
              onBlur={() => handleBlur(arr.name)}
            />
          </React.Fragment>
        ))}

        <div className="formErrors">
          {Object.keys(touched).map((field) =>
            touched[field] && errorMessages[field] ? (
              <div key={field} className="formError editInput__error">
                {errorMessages[field]}
              </div>
            ) : null
          )}
        </div>
      </MultiFormWraper>
    </div>
  );
};

export default CreateEmplStep2;
