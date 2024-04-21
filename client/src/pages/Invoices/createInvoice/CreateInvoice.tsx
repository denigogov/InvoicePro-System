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
  INITIAL_DATA_STEP4,
  Step4initialDateTypes,
} from "../../../components/InvoicesComponents/createInvoiceSteps/StepsInitialData";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import useSWR from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import { useAuth } from "../../../helpers/useAuth";
import {
  createCustomerCompany,
  fetchCustomerData,
} from "../../../api/customerAPI";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import { createInvoice } from "../../../api/invoiceAPI";
import { InvoiceType } from "../../../types/invoiceTypes";
import { successRequest } from "../../../components/GlobalComponents/successPrompt";
import Invoice from "../../../components/InvoicesComponents/Test";
import InvoiceStep4 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep4";

export interface StepsType {
  stepName: string;
  stepIndex: boolean;
  stepNumber: string | number;
}

const CreateInvoice: React.FC = () => {
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [buyerId, setBuyerId] = useState<number | null>(null);

  const [pdfInvoiceData, setPdfInvoiceData] = useState<InvoiceType>();

  //when customerCompany is created I'm taking the last ID from the API
  const [buyerLastId, setBuyerLastId] = useState<number | null>(null);

  const [buyerCompanyData, setBuyerCompanyData] =
    useState<Step2initialDateTypes>(INITIAL_DATA_STEP2);
  const [invoiceDetailsData, setInvoiceDetailsData] =
    useState<Step3initialDateTypes>(INITIAL_DATA_STEP3);

  const [addDescriptionAndPrice, setAddDescriptionAndPrice] =
    useState<Step4initialDateTypes[]>(INITIAL_DATA_STEP4);

  console.log(addDescriptionAndPrice);

  const { token, userInfo } = useAuth();

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
    isThirdStep,
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
    <InvoiceStep4
      addDescriptionAndPrice={addDescriptionAndPrice}
      setAddDescriptionAndPrice={setAddDescriptionAndPrice}
    />,
  ]);

  const stepNames: StepsType[] = [
    {
      stepName: "Seller Info",
      stepIndex: currentStepIndex === 0 ? true : false,
      stepNumber: currentStepIndex === 0 ? 1 : "",
    },
    {
      stepName: "Buyer Info",
      stepIndex: currentStepIndex === 1 ? true : false,
      stepNumber: currentStepIndex === 1 ? 2 : "",
    },
    {
      stepName: "Invoice Details",
      stepIndex: currentStepIndex === 2 ? true : false,
      stepNumber: currentStepIndex === 2 ? 3 : "",
    },
    {
      stepName: "Invoice Items",
      stepIndex: currentStepIndex === 3 ? true : false,
      stepNumber: currentStepIndex === 3 ? 4 : "",
    },
  ];

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

  const createInvoicePOST = async () => {
    try {
      const invoiceQuery: InvoiceType = {
        invoiceId: invoiceDetailsData?.invoiceId,
        date: invoiceDetailsData?.data,
        companyInfoId: companyId,
        customercompanyId: buyerId ? buyerId : buyerLastId,
        createdById: userInfo?.id ?? 1,
        description: invoiceDetailsData?.description,
        price: invoiceDetailsData?.price,
        totalPrice: invoiceDetailsData?.totalPrice,
      };

      const response = await createInvoice(token ?? "", invoiceQuery);

      if (response.ok) {
        successRequest(
          "Invoice Created",
          "The invoice has been successfully created"
        );
        // RESETING THE FILEDS
        setCompanyId(null);
        setBuyerId(null);
        setBuyerCompanyData(INITIAL_DATA_STEP2);
        setInvoiceDetailsData(INITIAL_DATA_STEP3);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // If user don't select any company won't allow to go to step 2
      if (!companyId && isFirstStep) {
        next();
      }

      // If there is buyer id go to next step if not go to createCustomerPOST logic
      if (isSecoundStep) {
        !buyerId ? next() : await createCustomerPOST();
      }

      if (isThirdStep) next(); // current made only to navigate throught form
      // if (isThirdStep) {
      //   await createInvoicePOST();
      // }
    } catch (error) {
      apiGeneralErrorHandle(
        error,
        "Something went very wrong, please try one more time "
      );
    }
  };

  return (
    <div className="createInvoice">
      <ProgressBar stepNames={stepNames} />

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

      {/* <Invoice /> */}
    </div>
  );
};

export default CreateInvoice;
