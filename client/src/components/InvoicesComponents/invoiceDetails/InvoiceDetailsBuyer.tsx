import { invoiceJoinDataTypes } from "../../../types/invoiceTypes";

// Styling inside of parrent componetn
interface InvoiceDetailsBuyerProps {
  invoiceData: (invoiceJoinDataTypes | undefined)[] | undefined;
}

const InvoiceDetailsBuyer: React.FC<InvoiceDetailsBuyerProps> = ({
  invoiceData,
}) => {
  return (
    <div>
      {invoiceData?.map((data) => (
        <ul key={data?.invoiceId}>
          <li>
            Company Name: <span>{data?.customerName ?? "not found"}</span>
          </li>
          <li>
            Street: <span>{data?.street}</span>
          </li>
          <li>
            City: <span>{data?.city}</span>
          </li>
          <li>
            ZipCode: <span>{data?.zipcode}</span>
          </li>
          <li>
            Country: <span>{data?.country}</span>
          </li>
          <li>
            ID Number: <span>{data?.idNumber}</span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default InvoiceDetailsBuyer;
