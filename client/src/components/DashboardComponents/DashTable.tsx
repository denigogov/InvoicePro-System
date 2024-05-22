// interface DashTableProps {}

// const DashTable: React.FC<DashTableProps> = ({}) => {
const DashTable: React.FC = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Product Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-cell="Invoice ID">12345</td>
            <td data-cell="Comapny Name">Product 1</td>
            <td data-cell="Date">2024-05-19</td>
            <td data-cell="Price">$100</td>
            <td data-cell="Status">Shipped</td>
          </tr>
          <tr>
            <td data-cell="Invoice ID">12346</td>
            <td data-cell="Comapny Name">Product 2</td>
            <td data-cell="Date">2024-05-18</td>
            <td data-cell="Price">$200</td>
            <td data-cell="Status">Pending</td>
          </tr>
          <tr>
            <td data-cell="Invoice ID">12347</td>
            <td data-cell="Comapny Name">Product 3</td>
            <td data-cell="Date">2024-05-17</td>
            <td data-cell="Price">$150</td>
            <td data-cell="Status">Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashTable;
