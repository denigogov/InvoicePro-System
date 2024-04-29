import { StyleSheet } from "@react-pdf/renderer";

const globalPadding = "0 50px";
const borderColor = "#cdc9c9";

export const styles = StyleSheet.create({
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
  sellerBuyerTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "customFontWeight500",
    letterSpacing: 2,
    fontSize: 13,
  },

  sellerBuyerData: {
    letterSpacing: 1,
    flexDirection: "row",
    padding: `${globalPadding}`,
    justifyContent: "space-between",
    fontSize: 11,
  },

  sellerBuyerRowData: {
    gap: 10,
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
    fontSize: 10,
    backgroundColor: "#F6F5F4",
    height: 80,
    flexDirection: "row",
    padding: `${globalPadding}`,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
