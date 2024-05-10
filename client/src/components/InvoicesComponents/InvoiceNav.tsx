import "../../Styling/Components/InvoiceComponentStyle/_invoiceNav.scss";
import { NavLink } from "react-router-dom";
import createInvoiceIcon from "../../assets/createInvoiceIcon.svg";
import viewInvoiceIcon from "../../assets/invoiceView.svg";

const InvoiceNav: React.FC = () => {
  return (
    <div className="invoiceNav">
      <nav>
        <ul>
          <NavLink to="all">
            <li>
              <img src={viewInvoiceIcon} alt="viewInvoiceIcon" />
              <span>All Invoices</span>
            </li>
          </NavLink>
          <NavLink to="create">
            <li>
              <img src={createInvoiceIcon} alt="createInvoiceIcon" />
              <span>Create New Invoice</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default InvoiceNav;
