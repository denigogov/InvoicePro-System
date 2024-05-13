import {
  Document,
  Page,
  Text,
  View,
  Font,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import downloadIcon from "../../assets/downloadPDF.svg";
import { CompanyInfoTypes } from "../../types/companyInfoTypes";
import React from "react";
import { AllCustomerTypes } from "../../types/customerAPITypes";
import {
  Step2initialDateTypes,
  Step3initialDateTypes,
  Step4initialDateTypes,
} from "./createInvoiceSteps/StepsInitialData";
import moment from "moment";
import { generateInvoiceNumber } from "../../helpers/InvoiceID";

// PDF STYLING CSS
import { styles } from "../../Styling/Components/InvoiceComponentStyle/invoiceStyle";

Font.register({
  family: "customFontWeight400",
  src: "http://fonts.gstatic.com/s/quicksand/v6/sKd0EMYPAh5PYCRKSryvW6CWcynf_cDxXwCLxiixG1c.ttf",
  format: "truetype",
  onError: (err: Error) => <p>{err.message},hello error font</p>,
});

Font.register({
  family: "customFontWeight500",
  src: "https://cdn.jsdelivr.net/gh/webfontworld/Quicksand/Quicksand-Medium.ttf",
  format: "truetype",
  onError: (err: Error) => <p>{err.message},hello error font</p>,
});
Font.register({
  family: "customFontWeight700",
  src: "https://cdn.jsdelivr.net/gh/webfontworld/Quicksand/Quicksand-Bold.ttf",
  format: "truetype",
  onError: (err: Error) => <p>{err.message},hello error font</p>,
});

interface InvoiceGeneratorTypes {
  filteredCompanyData?: CompanyInfoTypes[];
  filterBuyerData?: AllCustomerTypes[];
  buyerCompanyData: Step2initialDateTypes;
  invoiceDetailsData: Step3initialDateTypes;
  invoiceLastId?: number | null;
  addDescriptionAndPrice: Step4initialDateTypes[];
  signatureImg?: string;
  checkboxSignature?: boolean;
  taxValue: number;
  totalTax: string;
  discountValue: number;
  totalDiscount: string;
  totalPrice?: number;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorTypes> = ({
  filteredCompanyData,
  filterBuyerData,
  buyerCompanyData,
  invoiceDetailsData,
  invoiceLastId,
  addDescriptionAndPrice,
  signatureImg,
  checkboxSignature,
  taxValue,
  totalTax,
  discountValue,
  totalDiscount,
  totalPrice,
}) => {
  const generateInvoiceID = generateInvoiceNumber(
    invoiceLastId ? invoiceLastId : invoiceDetailsData?.invoiceId
  );

  const PDFGenerator = (
    // return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.firstPageHalf}>
            <View style={styles.pageTitle}>
              <Text>INVOICE</Text>
            </View>

            {/* Invoice Seller Buyer Data */}
            <View style={styles.sellerBuyerData}>
              {/* seler DATA */}
              <View style={styles.sellerBuyerRowData}>
                <Text style={styles.sellerBuyerTitle}>SELLER</Text>
                <View style={styles.gap4px}>
                  {filteredCompanyData?.map((data) => (
                    <React.Fragment key={data?.id}>
                      <Text>{data?.companyName ?? "Not Found"}</Text>
                      <Text>{data?.street ?? ""}</Text>
                      <Text>{`${data?.zipcode}, ${data?.city} - ${data?.country} `}</Text>
                      <Text>Ust.Ident-Nr: {data?.idNumber ?? "Not Found"}</Text>
                    </React.Fragment>
                  ))}
                </View>
                <Text style={styles.invoiceNumberDate}>
                  Invoice number: #{generateInvoiceID}
                </Text>
              </View>

              {/* Buyer DATA */}
              <View style={styles.sellerBuyerRowData}>
                <Text style={styles.sellerBuyerTitle}>BILLED TO:</Text>
                <View style={styles.gap4px}>
                  {filterBuyerData?.length ? (
                    <>
                      {filterBuyerData.map((buyer) => (
                        <React.Fragment key={buyer?.id}>
                          <Text>{buyer?.customerName ?? "Not Found"}</Text>
                          <Text>{buyer?.street ?? ""}</Text>
                          <Text>{`${buyer?.zipcode}, ${buyer?.city} - ${buyer?.country} `}</Text>
                          <Text>
                            Ust.Ident-Nr: {buyer?.idNumber ?? "Not Found"}
                          </Text>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      <Text>{buyerCompanyData?.customerName}</Text>
                      <Text>{buyerCompanyData?.street}</Text>
                      <Text>{`${buyerCompanyData?.zipcode}, ${buyerCompanyData?.city} - ${buyerCompanyData?.country} `}</Text>
                      <Text>
                        Ust.Ident-Nr:{" "}
                        {buyerCompanyData?.idNumber ?? "Not Found"}
                      </Text>
                    </>
                  )}
                </View>
                <Text style={styles.invoiceNumberDate}>
                  Invoice Date:{" "}
                  {moment(invoiceDetailsData?.data).format("Do MMMM YYYY")}
                </Text>
              </View>
              {/* COntainer end */}
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.secoundPageHalf}>
            <View style={styles.mainTable}>
              <View style={styles.mainTableTitle}>
                <Text>DESCRIPTION</Text>
                <Text>PRICE</Text>
              </View>
              <View style={styles.detailsContainer}>
                {addDescriptionAndPrice.map((item) => (
                  <View style={styles.details} key={item?.id}>
                    <Text>{item?.description ?? ""}</Text>
                    <Text>€ {item?.price ?? ""}</Text>
                  </View>
                ))}
              </View>

              {totalDiscount === "0.00" || (
                <View style={styles.footerTableDiscount}>
                  <Text>Discount {discountValue}%</Text>
                  <Text>€ {totalDiscount}</Text>
                </View>
              )}

              {totalTax === "0.00" || (
                <View style={styles.footerTableTax}>
                  <Text>Tax {taxValue}%</Text>
                  <Text>€ {totalTax}</Text>
                </View>
              )}

              <View style={styles.footerTable}>
                <Text>TOTAL DUE</Text>
                <Text>€ {totalPrice?.toFixed(2) ?? "N/A"}</Text>
              </View>
              {checkboxSignature && (
                <View>
                  <Text style={styles.signature}>Signature:</Text>
                  <Image style={styles.signatureImage} src={signatureImg} />
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <View style={styles.gap4px}>
                <Text style={styles.fontBold}>Bank Data</Text>
                <Text>
                  Bank Name:{" "}
                  <Text style={styles.fontBold}>
                    {filteredCompanyData?.length
                      ? filteredCompanyData[0]?.bankName
                      : ""}
                  </Text>
                </Text>
                <Text>
                  IBAN:{" "}
                  <Text style={styles.fontBold}>
                    {filteredCompanyData?.length
                      ? filteredCompanyData[0]?.iban
                      : ""}
                  </Text>
                </Text>
                <Text>
                  BIC/SWIFT:
                  <Text style={styles.fontBold}>
                    {filteredCompanyData?.length
                      ? filteredCompanyData[0]?.bic
                      : ""}
                  </Text>
                </Text>
              </View>
              <View style={styles.gap4px}>
                <Text>Phone: +49 0152 222 222 22</Text>
                <Text>email: comapny@gmail.com</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={PDFGenerator}
      fileName={`Invoice #${generateInvoiceID}.pdf`}
    >
      {({ loading, error }) =>
        loading ? (
          "Loading document..."
        ) : error ? (
          `Error: ${error}`
        ) : (
          <img src={downloadIcon} alt="downloadIcon" />
        )
      }
    </PDFDownloadLink>
  );
};

export default InvoiceGenerator;
