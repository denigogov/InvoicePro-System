import { FormEvent, useState } from "react";
import CreateEmplStep1 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep1";
import CreateEmplStep2 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep2";
import CreateEmplStep3 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep3";
import ProgressBar from "../../../components/GlobalComponents/ProgressBar";
import { useMultiStepForm } from "../../../helpers/useMultiStepForm";
import {
  FormInputs,
  INITIAL_DATA_STEP1,
  INITIAL_DATA_STEP1_Types,
  INITIAL_DATA_STEP2,
  INITIAL_DATA_STEP2_Types,
  INITIAL_DATA_STEP3,
  INITIAL_DATA_STEP3_Types,
  formStepName,
} from "./createEmployerInputs";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import { AllDepartmentsTypes } from "../../../types/departmentTypes";
import { fetchAllDepartments } from "../../../api/departmentAPI";
import { useAuth } from "../../../helpers/useAuth";
import useSWR from "swr";
import { createUserAPI } from "../../../api/userAPI";
import { useNavigate, useOutletContext } from "react-router-dom";

interface CreateEmployerProps {}

const CreateEmployer: React.FC<CreateEmployerProps> = () => {
  const [step1Data, setStep1Data] =
    useState<INITIAL_DATA_STEP1_Types>(INITIAL_DATA_STEP1);

  const [step2Data, setStep2Data] =
    useState<INITIAL_DATA_STEP2_Types>(INITIAL_DATA_STEP2);

  const [step3Data, setStep3Data] =
    useState<INITIAL_DATA_STEP3_Types>(INITIAL_DATA_STEP3);

  const { token } = useAuth();
  const navigate = useNavigate();
  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const updateFileds = (
    fileds: Partial<
      | INITIAL_DATA_STEP1_Types
      | INITIAL_DATA_STEP2_Types
      | INITIAL_DATA_STEP3_Types
    >
  ) => {
    setStep1Data((prev) => {
      return { ...prev, ...fileds };
    });
    setStep2Data((prev) => {
      return { ...prev, ...fileds };
    });
    setStep3Data((prev) => {
      return { ...prev, ...fileds };
    });
  };

  const showInputErrors = (inputs: FormInputs[]): Record<string, string> => {
    const errors: Record<string, string> = {};

    const passwordInput = inputs.find((input) => input.name === "password");

    const confirmPasswordInput = inputs.find(
      (input) => input.name === "confirm"
    );

    inputs.forEach((arr) => {
      if (arr.name) {
        switch (true) {
          case arr.required && arr.value.length < 1:
            errors[arr.name] = arr.errorMessage;
            break;
          case arr.minLength !== undefined && arr.value.length < arr.minLength:
            errors[arr.name] = arr.minLenghtMessage || "";
            break;
          case arr.maxLength !== undefined && arr.value.length > arr.maxLength:
            errors[arr.name] = arr.maxLengthMessage || "";
            break;
          case arr.pattern !== undefined && !arr.pattern.test(arr.value):
            errors[arr.name] = arr.errorMessage;
            break;
          default:
            break;
        }
      }
    });

    if (
      passwordInput &&
      confirmPasswordInput &&
      passwordInput.value !== confirmPasswordInput.value
    ) {
      errors[confirmPasswordInput.name] = confirmPasswordInput.errorMessage;
    }

    return errors;
  };

  const {
    data: allDepartmentsData,
    error: allDepartmentsDataError,
    isLoading: allDepartmentsDataLoading,
  } = useSWR<AllDepartmentsTypes[]>(["allDepartmentsData", token], () =>
    fetchAllDepartments(token ?? "")
  );

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isSecoundStep,
    isThirdStep,
    isLastStep,
  } = useMultiStepForm([
    <CreateEmplStep1
      {...step1Data}
      allDepartmentsData={allDepartmentsData}
      updateFileds={updateFileds}
      allDepartmentsDataError={allDepartmentsDataError}
      allDepartmentsDataLoading={allDepartmentsDataLoading}
    />,
    <CreateEmplStep2
      {...step2Data}
      updateFileds={updateFileds}
      showInputErrors={showInputErrors}
    />,
    <CreateEmplStep3
      {...step3Data}
      updateFileds={updateFileds}
      showInputErrors={showInputErrors}
    />,
  ]);

  const stepNames = formStepName(currentStepIndex);

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (step1Data?.departmentId !== "") {
        next();
      }

      if (isSecoundStep && step2Data?.firstName && step2Data.lastName !== "") {
        next();
      }

      // const { confirm, ...queryData } = step3Data;

      if (isThirdStep) {
        await createUserAPI(token ?? "", step3Data);
        setStep1Data(INITIAL_DATA_STEP1);
        setStep2Data(INITIAL_DATA_STEP2);
        setStep3Data(INITIAL_DATA_STEP3);
        navigate("/administration/employees");
        setPopupOpen((e) => !e);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  // Styling in _employeesStettings.scss
  return (
    <div className="createEmployer__container">
      <ProgressBar stepNames={stepNames} />

      <form
        className="createEmployer__container__form"
        onSubmit={handleSubmitForm}
      >
        <div className="createEmployer__container__form-steps">
          {steps[currentStepIndex]}
        </div>
        <div className="createInvoice__button-wrap">
          {!isFirstStep && (
            <button type="button" onClick={previuse}>
              <span>Previuse</span>
            </button>
          )}
          <button type="submit">
            <span>{!isLastStep ? "Next" : "Submit"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployer;
