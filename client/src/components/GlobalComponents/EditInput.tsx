import "../../Styling/Components/GlobalComponentStyle/_editInput.scss";
import errorIcon from "../../assets/errorIcon.svg";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DefaultInputValuesTypes } from "../../types/InputTypes";

interface EditInputProps {
  defaultInputValues?: DefaultInputValuesTypes[];
  title?: string;
}

type FormData = {
  [key: string]: string | number | boolean | undefined;
};
// STYLING IN EDIT _employeesSettings.scss
const EditInput: React.FC<EditInputProps> = ({ defaultInputValues, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const changedValues = Object.keys(dirtyFields).reduce((acc, fieldName) => {
      if (data[fieldName] !== undefined) {
        acc[fieldName] = data[fieldName]; // Add only changed values to the object
      }
      return acc;
    }, {} as FormData);

    console.log(changedValues);
  };
  return (
    <div className="editInput">
      <p className="editInput__title">{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                })}
                step={field?.step}
                defaultValue={field?.defaultValue}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditInput;
