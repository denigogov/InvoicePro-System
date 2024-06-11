import { FormEvent, useState } from "react";
import CreateEmplStep1 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep1";
import CreateEmplStep2 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep2";
import CreateEmplStep3 from "../../../components/AdministrationComponents/createEmployerComp/CreateEmplStep3";
import ProgressBar from "../../../components/GlobalComponents/ProgressBar";
import { useMultiStepForm } from "../../../helpers/useMultiStepForm";
import {
  INITIAL_DATA_STEP1,
  INITIAL_DATA_STEP1_Types,
  INITIAL_DATA_STEP2,
  INITIAL_DATA_STEP2_Types,
  INITIAL_DATA_STEP3,
  INITIAL_DATA_STEP3_Types,
  formStepName,
} from "./createEmployerInputs";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

interface CreateEmployerProps {}

const CreateEmployer: React.FC<CreateEmployerProps> = ({}) => {
  const [step1Data, setStep1Data] =
    useState<INITIAL_DATA_STEP1_Types>(INITIAL_DATA_STEP1);

  const [step2Data, setStep2Data] =
    useState<INITIAL_DATA_STEP2_Types>(INITIAL_DATA_STEP2);

  const [step3Data, setStep3Data] =
    useState<INITIAL_DATA_STEP3_Types>(INITIAL_DATA_STEP3);

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

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isLastStep,
    isSecoundStep,
    isThirdStep,
  } = useMultiStepForm([
    <CreateEmplStep1 {...step1Data} updateFileds={updateFileds} />,
    <CreateEmplStep2 {...step2Data} updateFileds={updateFileds} />,
    <CreateEmplStep3 {...step3Data} updateFileds={updateFileds} />,
  ]);

  const stepNames = formStepName(currentStepIndex);

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (step1Data?.departmentId) {
        next();
      }
    } catch (err) {
      apiGeneralErrorHandle(
        err,
        "Something went very wrong, please try one more time "
      );
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
