import React, { useState } from "react";
import {
  FormInputs,
  INITIAL_DATA_STEP3_Types,
  inputStep3,
} from "../../../pages/Settings/employeesInfo/createEmployerInputs";
import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";

type CreateEmplStep3Props = INITIAL_DATA_STEP3_Types & {
  updateFileds: (fileds: Partial<INITIAL_DATA_STEP3_Types>) => void;
  showInputErrors: (fields: FormInputs[]) => Record<string, string>;
};

const CreateEmplStep3: React.FC<CreateEmplStep3Props> = ({
  updateFileds,
  showInputErrors,
  email,
  password,
  confirm,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const inputs = inputStep3(email, password, confirm);
  const errorMessages: Record<string, string> = showInputErrors(
    inputs as FormInputs[]
  );

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
              onChange={(e) => handleChange(arr?.name ?? "", e.target.value)}
              minLength={arr.minLength}
              maxLength={arr.maxLength}
              required={arr.required}
              pattern={arr?.pattern?.source} // Converting RegExp to string
              onBlur={() => handleBlur(arr?.name ?? "")}
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

export default CreateEmplStep3;
