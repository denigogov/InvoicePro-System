import detailsIcon from "../../../assets/dashboardIcon.svg";
import deleteIcon from "../../../assets/addIcon.svg";

interface InvoicesTableProps {}
const InvoicesTable: React.FC<InvoicesTableProps> = ({}) => {
  return (
    <div className="table width600">
      <table>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Created At</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-cell="Invoice Id">24-00001</td>
            <td data-cell="Customer">Fells GmbH</td>
            <td data-cell="Total Price">€ 233</td>
            <td data-cell="Created At">23.01.2023</td>
            <td data-cell="Details">
              <img src={detailsIcon} alt="Details Icon" />
            </td>
            <td data-cell="Delete">
              <img src={deleteIcon} alt="Delete Icon" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
