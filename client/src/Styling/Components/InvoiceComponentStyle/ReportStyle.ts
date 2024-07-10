import { StyleSheet } from "@react-pdf/renderer";

// Font
const fontweight = {
  400: "customFontWeight400",
  500: "customFontWeight500",
  600: "customFontWeight600",
  700: "customFontWeight700",
};

const globalPadding = "60 60px";
// let borderColor = "#cdc9c9";
// let fontSizeTitle = 16;
// let fontSizeSubTitle = 11;
// let sectionTitle = 13;

export const reportStyles = StyleSheet.create({
  page: {
    padding: globalPadding,
    fontFamily: fontweight[400],
    fontSize: 13, // default font
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerComapny: {
    fontSize: 23,
    fontFamily: "customFontTitleBold",
  },
  headerCurrentDate: {
    fontSize: 12,
  },

  // Title Main Page
  title: {
    fontSize: 60,
    fontFamily: "customFontTitleBold",
  },

  subTitle: {
    fontSize: 20,
    fontFamily: "customFontTitleBold",
    paddingTop: 17,
  },

  // Footer Main Page
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: fontweight[500],
  },

  // Table

  table: {
    marginBottom: 10,
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 20,
  },
  tableCell: {
    flex: 1,
    padding: 2,
    fontSize: 8,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontWeight: "bold",
    fontSize: 8,
  },

  widerTableCell: {
    flex: 2,
  },
});
