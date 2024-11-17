interface DetailsCustomerProps {}
import { FaPaperclip } from "react-icons/fa";
import "../../../Styling/Components/AdministrationComponentsStyle/_customerDetails.scss";

const DetailsCustomer: React.FC<DetailsCustomerProps> = () => {
  const customer = {
    name: "User Company",
    email: "user@nexigo.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    numInvoices: 10,
    averagePurchase: 150.25,
    remainingBalance: 500.0,
  };

  return (
    <div className="customer-details-container popupScroll">
      <div className="header">
        <h3>Customer Information</h3>
        <p>Personal details and purchase information.</p>
      </div>
      <div className="details">
        <dl>
          <div className="detail-row">
            <dt>Full Name</dt>
            <dd>{customer.name}</dd>
          </div>
          <div className="detail-row">
            <dt>Email Address</dt>
            <dd>{customer.email}</dd>
          </div>
          <div className="detail-row">
            <dt>Phone Number</dt>
            <dd>{customer.phone}</dd>
          </div>
          <div className="detail-row">
            <dt>Address</dt>
            <dd>{customer.address}</dd>
          </div>
          <div className="detail-row">
            <dt>Number of Invoices</dt>
            <dd>{customer.numInvoices}</dd>
          </div>
          <div className="detail-row">
            <dt>Average Purchase</dt>
            <dd>${customer.averagePurchase}</dd>
          </div>
          <div className="detail-row">
            <dt>Remaining Balance</dt>
            <dd>${customer.remainingBalance}</dd>
          </div>
          <div className="detail-row">
            <dt>Attachments</dt>
            <dd>
              <ul className="attachments">
                <li className="attachment">
                  <div className="attachment-info">
                    <FaPaperclip className="icon" />
                    <span className="attachment-name">
                      resume_customer_details.pdf
                    </span>
                    <span className="attachment-size">2.4mb</span>
                  </div>
                  <a href="#" className="download-link">
                    Download
                  </a>
                </li>
                <li className="attachment">
                  <div className="attachment-info">
                    <FaPaperclip className="icon" />
                    <span className="attachment-name">invoice_details.pdf</span>
                    <span className="attachment-size">4.5mb</span>
                  </div>
                  <a href="#" className="download-link">
                    Download
                  </a>
                </li>{" "}
                <li className="attachment">
                  <div className="attachment-info">
                    <FaPaperclip className="icon" />
                    <span className="attachment-name">invoice_details.pdf</span>
                    <span className="attachment-size">4.5mb</span>
                  </div>
                  <a href="#" className="download-link">
                    Download
                  </a>
                </li>{" "}
                <li className="attachment">
                  <div className="attachment-info">
                    <FaPaperclip className="icon" />
                    <span className="attachment-name">invoice_details.pdf</span>
                    <span className="attachment-size">4.5mb</span>
                  </div>
                  <a href="#" className="download-link">
                    Download
                  </a>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default DetailsCustomer;
