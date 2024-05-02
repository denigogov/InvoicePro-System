// import { PDFViewer } from "@react-pdf/renderer";
import InvoiceGenerator from "./InvoiceGenerator";
import "../../Styling/Components/InvoiceComponentStyle/_downloadInvoice.scss";
import { CompanyInfoTypes } from "../../types/companyInfoTypes";
import { AllCustomerTypes } from "../../types/customerAPITypes";
import {
  Step2initialDateTypes,
  Step3initialDateTypes,
  Step4initialDateTypes,
} from "./createInvoiceSteps/StepsInitialData";

interface DownloadInvoiceProps {
  filteredCompanyData?: CompanyInfoTypes[];
  filterBuyerData?: AllCustomerTypes[];
  buyerCompanyData: Step2initialDateTypes;
  invoiceDetailsData: Step3initialDateTypes;
  addDescriptionAndPrice: Step4initialDateTypes[];
  invoiceLastId?: number | null;
  signatureImg?: string;
  checkboxSignature: boolean;
}

const DownloadInvoice: React.FC<DownloadInvoiceProps> = ({
  filteredCompanyData,
  filterBuyerData,
  buyerCompanyData,
  invoiceDetailsData,
  invoiceLastId,
  addDescriptionAndPrice,
  signatureImg,
  checkboxSignature,
}) => {
  return (
    <div className="downloadInvoice">
      <p>
        Thank you for submitting the form. Your invoice is ready for download.
      </p>

      {/* <PDFViewer style={{ width: "100%", height: "100vh" }}> */}
      <InvoiceGenerator
        filteredCompanyData={filteredCompanyData}
        filterBuyerData={filterBuyerData}
        buyerCompanyData={buyerCompanyData}
        invoiceDetailsData={invoiceDetailsData}
        invoiceLastId={invoiceLastId}
        addDescriptionAndPrice={addDescriptionAndPrice}
        signatureImg={signatureImg}
        checkboxSignature={checkboxSignature}
      />
      {/* </PDFViewer> */}
    </div>
  );
};

export default DownloadInvoice;
