import moment from "moment";
import "../../Styling/Pages/Dashboard/_reportFilter.scss";
interface ReportFilterProps {}

const ReportFilter: React.FC<ReportFilterProps> = () => {
  const today = moment().format("YYYY-MM-DD");

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

      <div className="reportFilter__checkbox">
        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Total invoices</label>
        </div>

        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Average invoice</label>
        </div>

        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Total Discount</label>
        </div>

        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Total Tax</label>
        </div>

        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Total Customers</label>
        </div>

        <div className="checkbox__item">
          <input type="checkbox" />
          <label>Invoices by status</label>
        </div>
      </div>

      <div className="reportFilter__buttons">
        <button className="btn">apply</button>
        <button className="btn">reset</button>
      </div>
    </article>
  );
};

export default ReportFilter;
