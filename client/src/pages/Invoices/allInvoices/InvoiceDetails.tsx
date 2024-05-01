import "../../../Styling/Pages/_invoiceDetails.scss";
import InvoiceDetailsBuyer from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsBuyer";
import InvoiceDetailsDescription from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsDescription";

const InvoiceDetails: React.FC = () => {
  return (
    <div className="invoiceDetails">
      <div className="invoiceDetails__title">
        <div className="invoiceDetails__title-invoiceID">
          <h3>Invoice ID: 24-00012</h3>
        </div>
        <div className="invoiceDetails__title-invoiceDate">
          <p>created at: 22.04.2024</p>
          <p className="invoiceDetails__title-status">status: Complited</p>
        </div>
      </div>

      <div className="invoiceDetails__buyer">
        <InvoiceDetailsBuyer />
      </div>

      <div className="invoiceDetails__description">
        <InvoiceDetailsDescription />
      </div>

      <div className="invoiceDetails__actionButton">
        <h3>Action</h3>
        <div className="invoiceDetails__actionButton-wrap">
          <button className="button__delete">Delete Invoice</button>
          <button className="button__downloadPDF">Download as PDF</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
