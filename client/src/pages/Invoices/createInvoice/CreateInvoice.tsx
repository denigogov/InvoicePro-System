import "../../../Styling/Components/InvoiceComponentStyle/_createInvoice.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
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
import useSWR, { useSWRConfig } from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import { useAuth } from "../../../helpers/useAuth";
import {
  createCustomerCompany,
  fetchCustomerData,
} from "../../../api/customerAPI";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  createInvoice,
  createInvoiceDetails,
  fetchLastInvoiceId,
  updateInvoice,
} from "../../../api/invoiceAPI";
import { InvoiceType, LastInvoiceIdType } from "../../../types/invoiceTypes";
import { successRequest } from "../../../components/GlobalComponents/successPrompt";
import InvoiceStep4 from "../../../components/InvoicesComponents/createInvoiceSteps/InvoiceStep4";
import { generateInvoiceNumber } from "../../../helpers/InvoiceID";
import DownloadInvoice from "../../../components/InvoicesComponents/DownloadInvoice";
import ReactSignatureCanvas from "react-signature-canvas";
import { fetchInvoiceSettings } from "../../../api/invoiceSettings";
import { InvoiceSettingsTypes } from "../../../types/invoiceSettingsTypes";
import { taxDiscountCalculate } from "../../../helpers/taxCalc";

export interface StepsType {
  stepName: string;
  stepIndex: boolean;
  stepNumber: string | number;
}

export interface TaxDiscountValuesProps {
  taxValue: number;
  totalTax: string;
  discountValue: number;
  totalDiscount: string;
  totalPrice?: number;
}

const CreateInvoice: React.FC = () => {
  // STEPS START  = 4
  const [companyId, setCompanyId] = useState<number | null>(null);

  const [buyerCompanyData, setBuyerCompanyData] =
    useState<Step2initialDateTypes>(INITIAL_DATA_STEP2);

  const [invoiceDetailsData, setInvoiceDetailsData] =
    useState<Step3initialDateTypes>(INITIAL_DATA_STEP3);

  const [addDescriptionAndPrice, setAddDescriptionAndPrice] =
    useState<Step4initialDateTypes[]>(INITIAL_DATA_STEP4);
  // STEPS END = 4

  const [buyerId, setBuyerId] = useState<number | null>(null);
  //when customerCompany is created I'm taking the last ID from the API
  const [buyerLastId, setBuyerLastId] = useState<number | null>(null);
  const [invoiceLastId, setInvoicelastId] = useState<number | null>();

  const [formSubmited, setFormSubmited] = useState<boolean>(false);

  const [signatureImg, setSignatureImg] = useState<string>("");
  const [checkboxSignature, setCheckboxSignature] = useState<boolean>(false);

  const { token, userInfo } = useAuth();
  const { mutate } = useSWRConfig();

  let padRef = useRef<any>(null);

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
    data: lastInvoiceId,
    error: lastInvoiceIdError,
    isLoading: lastInvoiceIdLoading,
  } = useSWR<LastInvoiceIdType[]>(["lastInvoiceId", token], () =>
    fetchLastInvoiceId(token ?? "")
  );
  const {
    data: invoiceSettingsData,
    error: invoiceSettingsDataError,
    isLoading: invoiceSettingsDataLoading,
  } = useSWR<InvoiceSettingsTypes[]>(["invoiceSettings", token], () =>
    fetchInvoiceSettings(token ?? "")
  );

  const {
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
    // mutate,
  } = useSWR<AllCustomerTypes[]>(["customerData", token], () =>
    fetchCustomerData(token ?? "")
  );

  useEffect(() => {
    // Taking the last ID from Buyer
    if (customerData) {
      const lastBuyerId = customerData[customerData.length - 1]?.id ?? null;
      setBuyerLastId(lastBuyerId);
    }

    // Taking the last Invoice ID
    if (lastInvoiceId) {
      const invoiceId = lastInvoiceId[0]?.lastId ?? null;
      setInvoicelastId(invoiceId);
    }
  }, [customerData, lastInvoiceId]);

  const generateInvoiceID = generateInvoiceNumber(
    invoiceLastId ? invoiceLastId + 1 : invoiceDetailsData?.invoiceId
  );

  const filteredCompanyData = companyData?.filter(
    (company) => company?.id === companyId
  );
  const filterBuyerData = customerData?.filter(
    (buyer) => buyer?.id === buyerId
  );

  const clearSignaturePad = (e: React.FormEvent) => {
    e.preventDefault();
    padRef.current?.clear();
    setSignatureImg("");
  };

  const saveSignature = (e: React.FormEvent) => {
    e.preventDefault();
    const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (url) setSignatureImg(url);
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
    <InvoiceStep1
      companyDataLoading={companyDataLoading}
      companyDataError={companyDataError}
      companyData={companyData}
      setCompanyId={setCompanyId}
      companyId={companyId}
      filteredCompanyData={filteredCompanyData}
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
    <InvoiceStep3
      {...invoiceDetailsData}
      updateFileds={updateFileds}
      generateInvoiceID={generateInvoiceID}
      invoiceSettingsData={invoiceSettingsData}
      lastInvoiceIdError={lastInvoiceIdError}
      lastInvoiceIdLoading={lastInvoiceIdLoading}
      invoiceSettingsDataError={invoiceSettingsDataError}
      invoiceSettingsDataLoading={invoiceSettingsDataLoading}
    />,
    <InvoiceStep4
      addDescriptionAndPrice={addDescriptionAndPrice}
      setAddDescriptionAndPrice={setAddDescriptionAndPrice}
      setCheckboxSignature={setCheckboxSignature}
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

  // create customerCompany if user create new company in STEP2
  const createCustomerPOST = async () => {
    try {
      const response = await createCustomerCompany(
        token ?? "",
        buyerCompanyData
      );
      if (response.ok) {
        // Using mutate to revalidate the date to take the last ID !
        mutate(["customerData", token]);
        next();
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  // STEP 3
  const createInvoicePOST = async () => {
    try {
      const invoiceQuery: InvoiceType = {
        date: invoiceDetailsData?.data,
        companyInfoId: companyId,
        customercompanyId: buyerId ? buyerId : buyerLastId,
        createdById: userInfo?.id ?? 1,
        tax: invoiceDetailsData?.tax ?? invoiceSettingsData?.[0]?.tax,
        discount:
          invoiceDetailsData?.discount ?? invoiceSettingsData?.[0]?.discount,
      };

      const response = await createInvoice(token ?? "", invoiceQuery);
      if (response.ok) {
        mutate(["lastInvoiceId", token]);
        next();
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };
  const taxValue =
    invoiceDetailsData?.tax ?? invoiceSettingsData?.[0]?.tax ?? 0;
  const discountValue =
    invoiceDetailsData?.discount ?? invoiceSettingsData?.[0]?.discount ?? 0;

  const calcPrice = addDescriptionAndPrice
    .map((detail) => detail?.price || 0)
    .reduce((acc, mov) => acc + mov, 0);

  // function for calculating the tax
  const calcTax = taxDiscountCalculate(calcPrice, taxValue);
  const calcDiscount = taxDiscountCalculate(calcPrice, discountValue);
  const totalPrice = +calcPrice + +calcTax + +calcDiscount;

  const taxDiscountValues: TaxDiscountValuesProps = {
    taxValue: taxValue,
    discountValue: discountValue,
    totalTax: calcTax,
    totalDiscount: calcDiscount,
    totalPrice: totalPrice,
  };

  // create invoiceDetails in STEP4
  const createPOSTInvoiceDetails = async () => {
    // removin the ID from the query because the Id only was used as key in the looping component
    const formatedQuery = addDescriptionAndPrice.map(({ id, ...rest }) => ({
      ...rest,
      invoiceID: invoiceLastId,
    }));

    const updateInvoiceIdQuery = {
      invoiceId: invoiceDetailsData?.invoiceId
        ? invoiceDetailsData?.invoiceId
        : generateInvoiceNumber(
            invoiceLastId ? invoiceLastId : invoiceDetailsData?.invoiceId
          ),
      totalPrice: addDescriptionAndPrice.length ? +calcPrice + +calcTax : 0,
    };
    try {
      const updateInvoiceID = await updateInvoice(
        invoiceLastId,
        token ?? "",
        updateInvoiceIdQuery
      );
      const response = await createInvoiceDetails(token ?? "", formatedQuery);

      if (updateInvoiceID.ok && response.ok) {
        successRequest(
          "Invoice Created",
          "The invoice has been successfully created"
        );

        setFormSubmited(true);
        // RESETING THE FILEDS

        // setCompanyId(null);
        // setBuyerId(null);
        // setBuyerCompanyData(INITIAL_DATA_STEP2);
        // setInvoiceDetailsData(INITIAL_DATA_STEP3);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // If user don't select any company won't allow to go to step 2
      if (companyId && isFirstStep) {
        next();
      }

      // If there is buyer id go to next step if not go to createCustomerPOST logic
      if (isSecoundStep) {
        buyerId ? next() : await createCustomerPOST();
      }

      // if (isThirdStep) next(); // current made only to navigate throught form
      if (isThirdStep) {
        await createInvoicePOST();
      }

      if (isLastStep) {
        await createPOSTInvoiceDetails();
      }
    } catch (error) {
      apiGeneralErrorHandle(
        error,
        "Something went very wrong, please try one more time "
      );
    }
  };

  return (
    <div className="createInvoice">
      {!formSubmited && (
        <>
          <ProgressBar stepNames={stepNames} />
          <form className="createInvoice__form" onSubmit={handleSubmitForm}>
            <div>{steps[currentStepIndex]}</div>
            {checkboxSignature && (
              <>
                <div className="createInvoice__signatureBox">
                  <ReactSignatureCanvas
                    penColor="#0048a8"
                    canvasProps={{
                      width: 300,
                      height: 200,
                      className: "sigCanvas",
                    }}
                    ref={padRef}
                  />
                </div>
                <div className="createInvoice__signatureBox-button">
                  <button
                    className="button__delete"
                    onClick={clearSignaturePad}
                  >
                    clear
                  </button>
                  <button
                    className={
                      signatureImg.length ? "signatureConfirm" : "saveSignature"
                    }
                    onClick={saveSignature}
                  >
                    {signatureImg.length ? "saved" : "save"}
                  </button>
                </div>
              </>
            )}
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
        </>
      )}
      {formSubmited && (
        <DownloadInvoice
          filteredCompanyData={filteredCompanyData}
          filterBuyerData={filterBuyerData}
          buyerCompanyData={buyerCompanyData}
          invoiceDetailsData={invoiceDetailsData}
          invoiceLastId={invoiceLastId}
          addDescriptionAndPrice={addDescriptionAndPrice}
          signatureImg={signatureImg}
          checkboxSignature={checkboxSignature}
          taxDiscountValues={taxDiscountValues}
        />
      )}
    </div>
  );
};

export default CreateInvoice;
