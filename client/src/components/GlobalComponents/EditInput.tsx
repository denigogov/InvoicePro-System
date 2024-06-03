import "../../Styling/Components/GlobalComponentStyle/_editInput.scss";
import errorIcon from "../../assets/errorIcon.svg";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DefaultInputValuesTypes } from "../../types/InputTypes";

interface EditInputProps {
  defaultInputValues?: DefaultInputValuesTypes[];
  title?: string;
  buttonName?: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sendRequestFn?: (queryData) => void;
}

type FormData = {
  [key: string]: string | number | boolean | undefined;
};
// STYLING IN EDIT _employeesSettings.scss
const EditInput: React.FC<EditInputProps> = ({
  defaultInputValues,
  title,
  buttonName,
  sendRequestFn,
}) => {
  const {
    formState: { errors, dirtyFields },
    register,
    getValues,
    handleSubmit,
  } = useForm<FormData>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (key !== "confirm") {
        acc[key] = data[key];
      }
      return acc;
    }, {} as FormData);

    const changedValues = Object.keys(dirtyFields).reduce((acc, fieldName) => {
      if (filteredData[fieldName] !== undefined) {
        acc[fieldName] = filteredData[fieldName];
      }
      return acc;
    }, {} as FormData);

    if (Object.keys(changedValues).length === 0) return;

    // function for sending the request to server
    if (sendRequestFn) {
      sendRequestFn(changedValues);
    }
  };

  return (
    <div className="editInput">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="editInput__title">{title}</p>
        {defaultInputValues?.map((field) => (
          <React.Fragment key={field?.id}>
            <label>{field?.label}</label>
            {field?.type === "select" ? (
              <select
                {...register(field?.name, {
                  required: field?.required,
                })}
              >
                <option value={field.defaultSelectValue?.value}>
                  {field.defaultSelectValue?.label}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field?.type}
                {...register(field?.name, {
                  required: field?.required,
                  minLength: {
                    value: field?.minLength || 0,
                    message: field?.minLengthMessage ?? "",
                  },
                  maxLength: {
                    value: field?.maxLength || Infinity,
                    message: field?.maxLengthMessage ?? "",
                  },
                  pattern: {
                    value: (field?.pattern ?? null) as RegExp,
                    message: field?.patternMessage ?? "",
                  },
                  validate:
                    field.name === "confirm"
                      ? {
                          matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return (
                              password === value || "Passwords don't match!"
                            );
                          },
                        }
                      : undefined,
                })}
                step={field?.step}
                defaultValue={field?.defaultValue}
                placeholder={field?.placeholder}
              />
            )}
            {errors[field?.name] && (
              <p className="editInput__error">
                <img src={errorIcon} alt="errorIcon" />
                {errors[field?.name]?.message}
              </p>
            )}
          </React.Fragment>
        ))}
        <button className="action__button-global" type="submit">
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default EditInput;
