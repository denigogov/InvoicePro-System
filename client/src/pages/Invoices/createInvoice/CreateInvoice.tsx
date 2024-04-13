import "../../../Styling/Components/InvoiceComponentStyle/_createInvoice.scss";
import { FormEvent, useState } from "react";
import ProgressBar from "../../../components/GlobalComponents/ProgressBar";
import InvoiceStep1 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep1";
import InvoiceStep2 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep2";
import InvoiceStep3 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep3";
import { useMultiStepForm } from "../../../helpers/useMultiStepForm";
import {
  Step2initialDateTypes,
  INITIAL_DATA_STEP2,
  INITIAL_DATA_STEP3,
  Step3initialDateTypes,
} from "../../../components/InvoicesComponents/createInvoiceSteps/StepsInitialData";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import useSWR from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import { useAuth } from "../../../helpers/useAuth";

interface CreateInvoiceProps {}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({}) => {
  const [companyId, setCompanyId] = useState<number | null>(null);

  const [buyerCompanyData, setBuyerCompanyData] =
    useState<Step2initialDateTypes>(INITIAL_DATA_STEP2);
  const [invoiceDetailsData, setInvoiceDetailsData] =
    useState<Step3initialDateTypes>(INITIAL_DATA_STEP3);

  const [stepOneSuccess, setStepOneSuccess] = useState<boolean>(false);
  const [stepTwoSuccess, setStepTwoSuccess] = useState<boolean>(false);

  const { token } = useAuth();

  const updateFileds = (
    fileds: Partial<Step3initialDateTypes | Step2initialDateTypes>
  ) => {
    setBuyerCompanyData((prev) => {
      return { ...prev, ...fileds };
    });

    setInvoiceDetailsData((prev) => {
      return { ...prev, ...fileds };
    });
  };

  const {
    data: companyData,
    error: companyDataError,
    isLoading: companyDataLoading,
  } = useSWR<CompanyInfoTypes[]>(["companyData", token], () =>
    fetchCompanyInfo(token ?? "")
  );

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isLastStep,
    isSecoundStep,
  } = useMultiStepForm([
    <InvoiceStep1
      companyDataLoading={companyDataLoading}
      companyDataError={companyDataError}
      companyData={companyData}
      setCompanyId={setCompanyId}
      companyId={companyId}
    />,
    <InvoiceStep2 {...buyerCompanyData} updateFileds={updateFileds} />,
    <InvoiceStep3 {...invoiceDetailsData} updateFileds={updateFileds} />,
  ]);

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

export default CreateInvoice;
