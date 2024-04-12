import { FormEvent, useState } from "react";
import "../../../Styling/Components/InvoiceComponentStyle/_createInvoice.scss";
import ProgressBar from "../../../components/GlobalComponents/ProgressBar";
import InvoiceStep1 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep1";
import InvoiceStep2 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep2";
import InvoiceStep3 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep3";
import { useMultiStepForm } from "../../../helpers/useMultiStepForm";

interface CreateInvoiceProps {}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({}) => {
  const [stepOneSuccess, setStepOneSuccess] = useState<boolean>(false);
  const [stepTwoSuccess, setStepTwoSuccess] = useState<boolean>(false);

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isLastStep,
    isSecoundStep,
  } = useMultiStepForm([<InvoiceStep1 />, <InvoiceStep2 />, <InvoiceStep3 />]);

  const stepNames = {
    step1Name: "Seller Info",
    step2Name: "Buyer Info",
    step3Name: "Description",
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    !stepOneSuccess ? next() : new Error("Step 1 Error");
  };

  return (
    <div className="createInvoice">
      <ProgressBar currentStepIndex={currentStepIndex} {...stepNames} />

      <form className="createInvoice__form" onSubmit={handleSubmitForm}>
        <div>{steps[currentStepIndex]}</div>

        <div className="multiForm__button-wrap">
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

export default CreateInvoice;
