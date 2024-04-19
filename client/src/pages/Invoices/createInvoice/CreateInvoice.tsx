import "../../../Styling/Components/InvoiceComponentStyle/_createInvoice.scss";
import { FormEvent, useEffect, useState } from "react";
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
import useSWR, { useSWRConfig } from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import { useAuth } from "../../../helpers/useAuth";
import {
  createCustomerCompany,
  fetchCustomerData,
} from "../../../api/customerAPI";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

interface CreateInvoiceProps {}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({}) => {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [buyerId, setBuyerId] = useState<number | null>(null);

  //when customerCompany is created I'm taking the last ID from the API
  const [buyerLastId, setBuyerLastId] = useState<number | null>(null);

  const [buyerCompanyData, setBuyerCompanyData] =
    useState<Step2initialDateTypes>(INITIAL_DATA_STEP2);
  const [invoiceDetailsData, setInvoiceDetailsData] =
    useState<Step3initialDateTypes>(INITIAL_DATA_STEP3);

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
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
    mutate,
  } = useSWR<AllCustomerTypes[]>(["customerData", token], () =>
    fetchCustomerData(token ?? "")
  );

  // Taking the last Employer ID
  useEffect(() => {
    if (customerData) {
      const lastEmployee = customerData[customerData.length - 1]?.id ?? null;
      setBuyerLastId(lastEmployee);
    }
  }, [customerData]);

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
    <InvoiceStep2
      {...buyerCompanyData}
      setBuyerCompanyData={setBuyerCompanyData}
      updateFileds={updateFileds}
      buyerId={buyerId}
      setBuyerId={setBuyerId}
      customerDataLoading={customerDataLoading}
      customerDataError={customerDataError}
      customerData={customerData}
    />,
    <InvoiceStep3 {...invoiceDetailsData} updateFileds={updateFileds} />,
  ]);

  const stepNames = {
    step1Name: "Seller Info",
    step2Name: "Buyer Info",
    step3Name: "Description",
  };

  // create customerCompany in STEP2
  const createCustomerPOST = async () => {
    try {
      const response = await createCustomerCompany(
        token ?? "",
        buyerCompanyData
      );
      if (response) {
        // Using mutate to revalidate the date to take the last ID !
        mutate();
        next();
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    // If user don't select any company won't allow to go to step 2
    if (companyId && isFirstStep) {
      next();
    }

    // If there is buyer id go to next step if not go to createCustomerPOST logic
    if (isSecoundStep) {
      buyerId ? next() : await createCustomerPOST();
    }
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
