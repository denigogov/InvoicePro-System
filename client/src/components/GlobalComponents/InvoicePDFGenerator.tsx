import {
  Document,
  Page,
  Text,
  View,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { styles } from "../../Styling/Components/InvoiceComponentStyle/invoiceStyle";
import React from "react";
import { invoiceDetails, invoiceJoinDataTypes } from "../../types/invoiceTypes";
import moment from "moment";
import { useAuth } from "../../helpers/useAuth";
import { fetchCompanyInfo } from "../../api/companyInfoAPI";
import { CompanyInfoTypes } from "../../types/companyInfoTypes";
import useSWR from "swr";
import ErrorMinimalDisplay from "./ErrorMinimalDisplay";
import LoadingRing from "./LoadingRing";
import { TaxDiscountValuesProps } from "../../pages/Invoices/createInvoice/CreateInvoice";

interface InvoicePDFGeneratorProps {
  buyerData?: (invoiceJoinDataTypes | undefined)[] | undefined;
  invoiceDescription?: (invoiceDetails | undefined)[] | undefined;
  taxDiscountValues?: TaxDiscountValuesProps;
}

const InvoicePDFGenerator: React.FC<Partial<InvoicePDFGeneratorProps>> = ({
  buyerData,
  invoiceDescription,
  taxDiscountValues,
}) => {
  const { token } = useAuth();

  Font.register({
    family: "customFontWeight400",
    src: "http://fonts.gstatic.com/s/quicksand/v6/sKd0EMYPAh5PYCRKSryvW6CWcynf_cDxXwCLxiixG1c.ttf",
  });

  Font.register({
    family: "customFontWeight500",
    src: "https://cdn.jsdelivr.net/gh/webfontworld/Quicksand/Quicksand-Medium.ttf",
  });
  Font.register({
    family: "customFontWeight700",
    src: "https://cdn.jsdelivr.net/gh/webfontworld/Quicksand/Quicksand-Bold.ttf",
  });

  const {
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
    // mutate,
  } = useSWR<CompanyInfoTypes[]>(["customerData", token], () =>
    fetchCompanyInfo(token ?? "")
  );

  if (customerDataError)
    return <ErrorMinimalDisplay errorMessage={customerDataError.message} />;
  if (customerDataLoading) return <LoadingRing />;

  const PDFGenerator = (
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
                  <Text>{customerData?.[0]?.companyName ?? "Not Found"}</Text>
                  <Text>{customerData?.[0]?.street ?? ""}</Text>
                  <Text>{`${customerData?.[0]?.zipcode}, ${customerData?.[0]?.city} - ${customerData?.[0]?.country} `}</Text>
                  <Text>
                    Ust.Ident-Nr: {customerData?.[0]?.idNumber ?? "Not Found"}
                  </Text>
                </View>
                <Text style={styles.invoiceNumberDate}>
                  Invoice number: #{buyerData?.[0]?.invoiceId ?? ""}
                </Text>
              </View>

              {/* Buyer DATA */}
              <View style={styles.sellerBuyerRowData}>
                <Text style={styles.sellerBuyerTitle}>BILLED TO:</Text>
                <View style={styles.gap4px}>
                  <Text>{buyerData?.[0]?.customerName ?? "Not Found"}</Text>
                  <Text>{buyerData?.[0]?.street ?? ""}</Text>
                  <Text>{`${buyerData?.[0]?.zipcode}, ${buyerData?.[0]?.city} - ${buyerData?.[0]?.country} `}</Text>
                  <Text>Ust.Ident-Nr: {buyerData?.[0]?.idNumber ?? ""}</Text>
                </View>
                <Text style={styles.invoiceNumberDate}>
                  Invoice Date:{" "}
                  {moment(buyerData?.[0]?.currentDate).format("Do MMMM YYYY")}
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

              {invoiceDescription?.length && (
                <View style={styles.detailsContainer}>
                  {invoiceDescription.map((item, i) => (
                    <View style={styles.details} key={i}>
                      <Text>{item?.description}</Text>
                      <Text>€ {item?.price}</Text>
                    </View>
                  ))}
                </View>
              )}

              {taxDiscountValues?.totalDiscount === 0.0 || (
                <View style={styles.footerTableDiscount}>
                  <Text>Discount {taxDiscountValues?.discountValue}%</Text>
                  <Text>€ {taxDiscountValues?.totalDiscount}</Text>
                </View>
              )}

              {taxDiscountValues?.totalTax === 0.0 || (
                <View style={styles.footerTableTax}>
                  <Text>Tax {taxDiscountValues?.taxValue}%</Text>
                  <Text>€ {taxDiscountValues?.totalTax}</Text>
                </View>
              )}

              <View style={styles.footerTable}>
                <Text>TOTAL DUE</Text>
                <Text>
                  € {Number(taxDiscountValues?.totalPrice).toFixed(2)}{" "}
                </Text>
              </View>
              {/* {checkboxSignature && (
                <View>
                  <Text style={styles.signature}>Signature:</Text>
                  <Image style={styles.signatureImage} src={signatureImg} />
                </View>
              )} */}
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <View style={styles.gap4px}>
                <Text style={styles.fontBold}>Bank Data</Text>
                <Text>
                  Bank Name:{" "}
                  <Text style={styles.fontBold}>
                    {customerData?.[0]?.bankName}
                  </Text>
                </Text>
                <Text>
                  IBAN:{" "}
                  <Text style={styles.fontBold}>
                    {" "}
                    {customerData?.[0]?.iban}
                  </Text>
                </Text>
                <Text>
                  BIC/SWIFT:
                  <Text style={styles.fontBold}> {customerData?.[0]?.bic}</Text>
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
      fileName={`Invoice Copy #${buyerData?.[0]?.invoiceId ?? ""}.pdf`}
    >
      {({ loading, error }) =>
        loading ? (
          "Loading document..."
        ) : error ? (
          `Error: ${error}`
        ) : (
          <button className="button__downloadPDF">Download as PDF</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default InvoicePDFGenerator;
