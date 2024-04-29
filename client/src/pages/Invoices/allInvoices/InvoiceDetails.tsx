import "../../../Styling/Pages/_invoiceDetails.scss";

const InvoiceDetails: React.FC = () => {
  return (
    <div className="invoiceDetails">
      <div className="invoiceDetails__title">
        <div className="invoiceDetails__title-invoiceID">
          <h3>Invoice ID: 24-00012</h3>
        </div>
        <div className="invoiceDetails__title-invoiceDate">
          <p>created at: 22.04.2024</p>
        </div>
      </div>

      <div className="invoiceDetails__body">
        <ul>
          <li>Company Name: BadCompany GmbH</li>
          <li>Street: Am SchlossBuckel 10</li>
          <li>City: Bretten</li>
          <li>ZipCode: 75015</li>
          <li>Country: Germany</li>
          <li>ID Number: A34BB33o390</li>
        </ul>
      </div>
    </div>
  );
};

export default InvoiceDetails;
