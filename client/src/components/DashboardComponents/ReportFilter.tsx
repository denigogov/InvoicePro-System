import moment from "moment";
import "../../Styling/Pages/Dashboard/_reportFilter.scss";
import { useState } from "react";
interface ReportFilterProps {}

const ReportFilter: React.FC<ReportFilterProps> = () => {
  const today = moment().format("YYYY-MM-DD");

  const [allChecked, setAllChecked] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    totalInvoices: true,
    averageInvoice: true,
    totalDiscount: true,
    totalTax: true,
    totalCustomers: true,
    invoicesByStatus: true,
  });

  const handleToggleAll = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckboxes({
      totalInvoices: newCheckedState,
      averageInvoice: newCheckedState,
      totalDiscount: newCheckedState,
      totalTax: newCheckedState,
      totalCustomers: newCheckedState,
      invoicesByStatus: newCheckedState,
    });
  };

  const handleCheckboxChange = (name) => {
    setCheckboxes((prevState) => {
      const newState = { ...prevState, [name]: !prevState[name] };
      const allSelected = Object.values(newState).every(Boolean);
      setAllChecked(allSelected);
      return newState;
    });
  };

  return (
    <article className="reportFilter">
      <header>
        <h5>Apply Filters</h5>
        <p>Adjust the filters to customize your report view</p>
      </header>

      <section className="reportFilter__date">
        <div className="reportFilter__date-start">
          <label>Start Date</label>
          <input type="date" required />
        </div>
        <div className="reportFilter__date-end">
          <label>End Date</label>
          <input type="date" max={today} required />
        </div>
      </section>

      {/* Checkbox filters */}
      <div className="reportFilter__checkbox">
        <div className="reportFilter__checkbox-title">
          <abbr title="Select the filters you want to apply to the report">
            Report Filters
          </abbr>
          <label>{allChecked ? "Deselect All" : "Select All"}</label>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleToggleAll}
          />
        </div>
        <div className="reportFilter__checkbox-inputs">
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalInvoices}
              onChange={() => handleCheckboxChange("totalInvoices")}
            />
            <label>Total invoices</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.averageInvoice}
              onChange={() => handleCheckboxChange("averageInvoice")}
            />
            <label>Average invoice</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalDiscount}
              onChange={() => handleCheckboxChange("totalDiscount")}
            />
            <label>Total Discount</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalTax}
              onChange={() => handleCheckboxChange("totalTax")}
            />
            <label>Total Tax</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalCustomers}
              onChange={() => handleCheckboxChange("totalCustomers")}
            />
            <label>Total Customers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.invoicesByStatus}
              onChange={() => handleCheckboxChange("invoicesByStatus")}
            />
            <label>Invoices by status</label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="reportFilter__buttons">
        <button className="btn">Apply</button>
        <button className="btn">Reset</button>
      </div>
    </article>
  );
};

export default ReportFilter;
