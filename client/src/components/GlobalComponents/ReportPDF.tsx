import {
  Document,
  Page,
  Text,
  View,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { reportStyles } from "../../Styling/Components/InvoiceComponentStyle/ReportStyle";
import customFontWeight400 from "../../Styling/Components/InvoiceComponentStyle/Quicksand-Light.ttf";
import customFontWeight500 from "../../Styling/Components/InvoiceComponentStyle/Quicksand-Medium.ttf";
import customFontWeight600 from "../../Styling/Components/InvoiceComponentStyle/Quicksand-SemiBold.ttf";
import customFontWeight700 from "../../Styling/Components/InvoiceComponentStyle/Quicksand-Bold.ttf";
import customFontTitleBold from "../../Styling/Components/InvoiceComponentStyle/Geologica-Bold.ttf";
// import comapnyLogo from "../../assets/nexsigo.png";

interface ReportPDFProps {}

const ReportPDF: React.FC<ReportPDFProps> = () => {
  Font.register({
    family: "customFontWeight400",
    src: customFontWeight400,
    onError: (err: Error) => <p>{err.message},hello error font</p>,
  });

  Font.register({
    family: "customFontWeight500",
    src: customFontWeight500,
    onError: (err: Error) => <p>{err.message},hello error font</p>,
  });
  Font.register({
    family: "customFontWeight600",
    src: customFontWeight600,
    onError: (err: Error) => <p>{err.message},hello error font</p>,
  });
  Font.register({
    family: "customFontWeight700",
    src: customFontWeight700,
    onError: (err: Error) => <p>{err.message},hello error font</p>,
  });
  Font.register({
    family: "customFontTitleBold",
    src: customFontTitleBold,
    onError: (err: Error) => <p>{err.message},hello error font</p>,
  });

  // return (
  const PDFReportGenerator = (
    <Document>
      <Page size="A4" style={reportStyles.page}>
        {/* Top Comapny Name */}
        <View style={reportStyles.header}>
          <Text style={reportStyles.headerComapny}>All Transport</Text>
          <Text style={reportStyles.headerCurrentDate}>16th June 2024</Text>
        </View>

        {/* Main Title */}
        <View>
          <Text style={reportStyles.title}>Financial</Text>
          <Text style={reportStyles.title}>Report</Text>
          <Text style={reportStyles.subTitle}>Q2 for 2024</Text>
        </View>

        {/* footer */}
        <View style={reportStyles.footerContainer}>
          {/* owner data */}
          <View>
            <Text>Dejan Gogov</Text>
            <Text>Web Developer</Text>
            <Text>linkedin link</Text>
          </View>
          {/* company data */}
          <View>
            <Text>All Transport GmbH</Text>
            <Text>Kralsifja 23</Text>
            <Text>67429 Karlsruhe</Text>
          </View>
        </View>
      </Page>

      {/* Page 2 */}
      <Page>
        <View>
          <View style={reportStyles.table}>
            {/* Table header */}
            <View style={[reportStyles.tableRow, reportStyles.tableHeader]}>
              <Text style={reportStyles.tableCell}>#</Text>
              <Text style={reportStyles.tableCell}>Article Number</Text>
              <Text
                style={[reportStyles.tableCell, reportStyles.widerTableCell]}
              >
                Article Name
              </Text>
              <Text style={reportStyles.tableCell}>quantity</Text>
              <Text style={reportStyles.tableCell}>Price</Text>
              <Text style={reportStyles.tableCell}>Category</Text>
              <Text style={reportStyles.tableCell}>Date entry</Text>
            </View>
            {/* Table rows */}

            <View style={reportStyles.tableRow}>
              <Text style={reportStyles.tableCell}>1</Text>
              <Text style={reportStyles.tableCell}>33434343</Text>
              <Text
                style={[reportStyles.tableCell, reportStyles.widerTableCell]}
              >
                dedede dededede
              </Text>
              <Text style={[reportStyles.tableCell]}>dasdsa</Text>

              <Text style={reportStyles.tableCell}>31231 €</Text>
              <Text style={reportStyles.tableCell}>31231 €</Text>
              <Text style={reportStyles.tableCell}>dasdsa</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={PDFReportGenerator}
      fileName={`ComapnyReport.pdf`}
    >
      {({ loading, error }) =>
        loading ? (
          ""
        ) : error ? (
          `Error: ${error}`
        ) : (
          <button className="btn">Download</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default ReportPDF;
