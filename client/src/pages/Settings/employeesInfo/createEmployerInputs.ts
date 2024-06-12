export interface INITIAL_DATA_STEP1_Types {
  departmentId: string;
}

export interface INITIAL_DATA_STEP2_Types {
  firstName: string;
  lastName: string;
}
export interface INITIAL_DATA_STEP3_Types {
  email: string;
  password: string;
}

export interface FormInputs {
  id: number;
  label: string;
  name: string;
  type: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  required: boolean;
  errorMessage: string;
  minLenghtMessage?: string;
  maxLengthMessage?: string;
}

export const formStepName = (currentStepIndex: number) => {
  const stepsNames = [
    {
      stepName: "Department",
      stepIndex: currentStepIndex === 0 ? true : false,
      stepNumber: currentStepIndex === 0 ? 1 : "",
    },
    {
      stepName: "Personal Data",
      stepIndex: currentStepIndex === 1 ? true : false,
      stepNumber: currentStepIndex === 1 ? 2 : "",
    },
    {
      stepName: "Email and Password",
      stepIndex: currentStepIndex === 2 ? true : false,
      stepNumber: currentStepIndex === 2 ? 3 : "",
    },
  ];

  return stepsNames;
};

export const INITIAL_DATA_STEP1: INITIAL_DATA_STEP1_Types = {
  departmentId: "",
};

export const INITIAL_DATA_STEP2: INITIAL_DATA_STEP2_Types = {
  firstName: "",
  lastName: "",
};

export const INITIAL_DATA_STEP3: INITIAL_DATA_STEP3_Types = {
  email: "",
  password: "",
};

export const inputStep2 = (
  firstName: string,
  lastName: string
): FormInputs[] => {
  const inputs = [
    {
      id: 1,
      label: "First Name",
      name: "firstName",
      type: "text",
      value: firstName || "",
      minLength: 3,
      maxLength: 30,
      required: true,
      errorMessage: "First Name is required",
      minLenghtMessage: "First Name should be min 3 letters",
      maxLengthMessage: "First Name should be max 30 letters",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      label: "Last Name",
      value: lastName || "",
      minLength: 3,
      maxLength: 30,
      minLenghtMessage: "Last Name should be min 3 letters",
      errorMessage: "Last Name is required",
      maxLengthMessage: "Last Name5 should be max 30 letters",
      required: true,
    },
  ];

  return inputs;
};

export const inputStep3 = (
  email: string,
  password: string
): Partial<FormInputs>[] => {
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      value: email || "",
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: "Invalid email format",
    },

    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      value: password || "",
      placeholder: "Add your password",
      pattern:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      errorMessage: `Password should be at least 6 characters and should include at least 1 letter, 1 number, and 1 special character`,
    },
    {
      id: 3,
      name: "confirm",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
    },
  ];

  return inputs;
};
