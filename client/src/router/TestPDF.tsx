import { PDFViewer } from "@react-pdf/renderer";
import ReportPDF from "../components/GlobalComponents/ReportPDF";

interface testPDFProps {}

const TestPDF: React.FC<testPDFProps> = () => {
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <ReportPDF />
      </PDFViewer>
    </>
  );
};

export default TestPDF;
