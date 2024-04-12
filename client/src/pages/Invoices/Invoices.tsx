// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Outlet } from "react-router-dom";
import InvoiceNav from "../../components/InvoicesComponents/InvoiceNav";

const Invoices: React.FC = () => {
  return (
    <div>
      <InvoiceNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Invoices;
