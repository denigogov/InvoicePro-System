import { NavLink } from "react-router-dom";
import createInvoiceIcon from "../../assets/createInvoiceIcon.svg";
import "../../Styling/Components/InvoiceComponentStyle/_invoiceNav.scss";

interface InvoiceNavProps {}

const InvoiceNav: React.FC<InvoiceNavProps> = ({}) => {
  return (
    <div className="invoiceNav">
      <nav>
        <ul>
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
