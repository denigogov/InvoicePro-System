import "../../../Styling/Components/InvoiceComponentStyle/_allInvoice.scss";
import InvoiceTableNav from "../../../components/InvoicesComponents/allInvoices/InvoiceTableNav";
import InvoicesTable from "../../../components/InvoicesComponents/allInvoices/InvoicesTable";

interface AllInvoicesProps {}

const AllInvoices: React.FC<AllInvoicesProps> = ({}) => {
  return (
    <div className="allInvoices">
      <InvoiceTableNav />
      <InvoicesTable />
    </div>
  );
};

export default AllInvoices;
