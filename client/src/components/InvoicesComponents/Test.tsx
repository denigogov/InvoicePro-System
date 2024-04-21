import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

Font.register({
  family: "customFont",
  src: "http://fonts.gstatic.com/s/quicksand/v6/sKd0EMYPAh5PYCRKSryvW6CWcynf_cDxXwCLxiixG1c.ttf",
});

const Test: React.FC = () => {
  let globalPadding = "0 50px";

  const styles = StyleSheet.create({
    page: {
      // minHeight: "100%", // content height
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "customFont",
      fontWeight: "light",
    },
    pageContainer: { display: "flex", flexDirection: "column", gap: "40px" },

    boldText: {},

    // pageTitle START
    pageTitle: {
      backgroundColor: "#F6F5F4",
      height: 180,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: `${globalPadding}`,
      fontSize: 42,
      letterSpacing: 15,
      fontWeight: "ultralight",
    },
    // pageTitle CONTAINER END

    // Invoice and Bill to container START
    companyDataContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: `${globalPadding}`,
      fontWeight: 100,
      fontSize: 18,
      lineHeight: 1.8,
    },

    buyerData: {
      display: "flex",
      flexDirection: "column",
    },

    invoiceInfo: {
      display: "flex",
      flexDirection: "column",
    },
    // Invoice and Bill to container END
  });
  const PDFGenerator = (
    // return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.pageTitle}>
            <Text>Invoice</Text>
          </View>

          <View style={styles.companyDataContainer}>
            <View style={styles.buyerData}>
              <Text style={styles.boldText}>Bill To:</Text>
              <Text>Straus GmbH</Text>
              <Text>Am SchlossBuckel 10</Text>
              <Text>75015 Bretten Germany</Text>
              <Text>Ident-VAT: DE223311321 </Text>
            </View>

            <View style={styles.invoiceInfo}>
              <Text>
                <Text style={styles.boldText}>INVOICE: </Text>#34343FF3
              </Text>
              <Text>
                <Text style={styles.boldText}>Date: </Text>2024
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={PDFGenerator} fileName="somename.pdf">
      {({ loading, error }) =>
        loading
          ? "Loading document..."
          : error
          ? `Error: ${error}`
          : "Download now!"
      }
    </PDFDownloadLink>
  );
};

export default Test;
