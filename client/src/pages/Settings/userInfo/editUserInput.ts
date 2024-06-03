import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { FetchAllUsersTypes } from "../../../types/userDataTypes";

export const editUserInput = (userData: FetchAllUsersTypes[]) => {
  const inputForm: DefaultInputValuesTypes[] = [
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
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Change your password",
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

  return inputForm;
};
