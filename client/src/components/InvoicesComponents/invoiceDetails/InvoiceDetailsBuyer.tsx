// Styling inside of parrent componetn
const InvoiceDetailsBuyer: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          Company Name: <span>BadCompany GmbH</span>
        </li>
        <li>
          Street: <span>Am SchlossBuckel 10</span>
        </li>
        <li>
          City: <span>Bretten</span>
        </li>
        <li>
          ZipCode: <span>75015</span>
        </li>
        <li>
          Country: <span>Germany</span>
        </li>
        <li>
          ID Number: <span>A34BB33o390</span>
        </li>
      </ul>
    </div>
  );
};

export default InvoiceDetailsBuyer;
