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
