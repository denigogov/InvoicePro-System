interface InvoiceSettingsProps {}

const InvoiceSettings: React.FC<InvoiceSettingsProps> = () => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-cell="Last Name">blablalba</td>
            <td data-cell="Email">denigogov@hotmail.com </td>
            <td data-cell="Department">deni@gmai.com</td>
            <td data-cell="Department">deni@gmai.com</td>
            <td data-cell="Department">de2ni@gmai.com</td>
          </tr>

          <tr>
            <td data-cell="Last Name">blablalba</td>
            <td data-cell="Email">denigogov@hotmail.com </td>
            <td data-cell="Department">deni@gmai.com</td>
            <td data-cell="Department">deni@gmai.com</td>
            <td data-cell="Department">de2ni@gmai.com</td>
          </tr>

          <tr>
            <td data-cell="Last Name">blablalba</td>
            <td data-cell="Email">denigogov@ </td>
            <td data-cell="Department">deni@gcom</td>
            <td data-cell="Department">deni@gmai.com</td>
            <td data-cell="Department">de2ni@gmai.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceSettings;
