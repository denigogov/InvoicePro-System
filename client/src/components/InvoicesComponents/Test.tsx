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

const Test: React.FC = () => {
  let globalPadding = "0 50px";
  let borderColor = "#cdc9c9";

  const styles = StyleSheet.create({
    page: {
      padding: 0,
      margin: 0,
      justifyContent: "space-between",
      fontFamily: "customFontWeight400",
    },

    pageContainer: {
      height: "100%",
      justifyContent: "space-between",
      gap: 80,
    },
    // split page on 2
    firstPageHalf: { justifyContent: "space-between", flex: 0.7 },
    secoundPageHalf: { justifyContent: "space-between", flex: 1 },

    // pageTitle START
    pageTitle: {
      backgroundColor: "#F6F5F4",
      height: 130,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: `${globalPadding}`,
      fontSize: 26,
      letterSpacing: 15,
    },
    // pageTitle CONTAINER END

    // Invoice and Bill to container START
    companyDataContainer: {
      display: "flex",
      gap: 10,
      padding: `${globalPadding}`,
    },
    sellerBuyerTitle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "customFontWeight500",
      letterSpacing: 2,
      fontSize: 13,
    },

    billedTo: {
      marginRight: 101.5,
    },

    sellerBuyerData: {
      letterSpacing: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 11,
    },

    gap4px: {
      gap: 4,
    },

    fontBold: {
      fontFamily: "customFontWeight700",
    },

    billetTo: {
      marginRight: 36.5,
    },

    invoiceNumberDate: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "customFontWeight700",
      letterSpacing: 1,
      fontSize: 11.5,
    },
    // Invoice and Bill to container END

    mainTable: {
      // for main view
      padding: `${globalPadding}`,
      // marginTop: 50, // temporery between table and invoiceSeller Buyer Data
      // marginBottom: 50, // temporery between table and invoiceSeller Buyer Data
    },

    mainTableTitle: {
      paddingBottom: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: borderColor,
      borderBottomColor: borderColor,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "customFontWeight700",
      fontSize: 12,
      letterSpacing: 1,
    },

    detailsContainer: { flexDirection: "column" },

    details: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 11,
      paddingBottom: 10,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      fontFamily: "customFontWeight500",
    },

    footerTable: {
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "customFontWeight700",
      fontSize: 12,
      letterSpacing: 1,
    },

    footerContainer: {
      backgroundColor: "#F6F5F4",
      height: 80,
    },
  });
  // const PDFGenerator = (
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.firstPageHalf}>
            <View style={styles.pageTitle}>
              <Text>INVOICE</Text>
            </View>

            {/* Invoice Seller Buyer Data */}
            <View style={styles.companyDataContainer}>
              <View style={styles.sellerBuyerTitle}>
                <Text>SELLER:</Text>
                <Text style={styles.billedTo}>BILLED TO:</Text>
              </View>

              <View style={styles.sellerBuyerData}>
                <View style={styles.gap4px}>
                  <Text>Owner Data</Text>
                  <Text>Am SchlosBuckel 10</Text>
                  <Text>75015, Bretten - Germany</Text>
                  <Text>Ust.Ident-Nr: 55122225</Text>
                </View>

                <View style={[styles.gap4px, styles.billetTo]}>
                  <Text>Customer Data</Text>
                  <Text>Am SchlosBuckel 10</Text>
                  <Text>75015, Bretten - Germany</Text>
                  <Text>Ust.Ident-Nr: 55122225</Text>
                </View>
              </View>

              <View style={styles.invoiceNumberDate}>
                <Text>Invoice number: #24-00001</Text>
                <Text>Invoice Date: 12nd May, 2026</Text>
              </View>
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
                <View style={styles.details}>
                  <Text>
                    Transport By E670HM Travel Order N.47458/Our Pro No: 27643
                  </Text>
                  <Text>€ 150</Text>
                </View>

                <View style={styles.details}>
                  <Text>
                    Transport By E670HM Travel Order N.47458/Our Pro No: 27643
                  </Text>
                  <Text>€ 150</Text>
                </View>

                <View style={styles.details}>
                  <Text>Transport B Pro No: 27643</Text>
                  <Text>€ 150</Text>
                </View>

                <View style={styles.details}>
                  <Text>
                    Transport By E670HM Travel Order N.47458/Our Pro No: 27643
                  </Text>
                  <Text>€ 2150</Text>
                </View>
              </View>{" "}
              <View style={styles.footerTable}>
                <Text>TOTAL DUE</Text>
                <Text>€ 11.150</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text>Footer</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  // return (
  //   <PDFDownloadLink document={PDFGenerator} fileName="somename.pdf">
  //     {({ loading, error }) =>
  //       loading
  //         ? "Loading document..."
  //         : error
  //         ? `Error: ${error}`
  //         : "Download now!"
  //     }
  //   </PDFDownloadLink>
  // );
};

export default Test;
