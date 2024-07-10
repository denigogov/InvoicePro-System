import "../../Styling/Pages/Dashboard/_reportFilter.scss";
import { CheckboxState, QueryTypes } from "../../types/reportTypes";
import ReportPDF from "../GlobalComponents/ReportPDF";

type DatePropsType = {
  startDate: string;
  endDate: string;
  today: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};
type quarterPropsType = {
  selectQuarter: string;
  setSelectQuarter: React.Dispatch<React.SetStateAction<string>>;
};

type checkPropsTypes = {
  checkboxes: CheckboxState;
  allChecked: boolean;
  handleToggleAll: () => void;
  handleCheckboxChange: (name: keyof CheckboxState) => void;
};

type submitProps = {
  submit: boolean;
  downloadReady: boolean;
  submitFilterForm: (query: Partial<QueryTypes>) => void;
  submitDownloadReport: () => void;
};

interface ReportFormProps {
  dateProps: DatePropsType;
  quarterProps: quarterPropsType;
  checkProps: checkPropsTypes;
  submitProps: submitProps;
}

const ReportForm: React.FC<ReportFormProps> = ({
  dateProps,
  quarterProps,
  checkProps,
  submitProps,
}) => {
  // Destructing the props ... and organize them for easy mantaining in future!
  const { today, startDate, endDate, setStartDate, setEndDate } = dateProps;

  const { selectQuarter, setSelectQuarter } = quarterProps;

  const { checkboxes, allChecked, handleToggleAll, handleCheckboxChange } =
    checkProps;

  const { submit, submitFilterForm, downloadReady, submitDownloadReport } =
    submitProps;

  const handleSubmitForm = () => {
    const query: Partial<QueryTypes> = {
      checkedBox: checkboxes,
    };

    console.log(submitDownloadReport);

    if (!selectQuarter) {
      query.startDate = startDate;
      query.endDate = endDate;
    } else {
      query.yearQuarter = selectQuarter;
    }
    submitFilterForm(query);
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
          <input
            type="date"
            required
            defaultValue={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={submit}
          />
        </div>
        <div className="reportFilter__date-end">
          <label>End Date</label>
          <input
            type="date"
            max={today}
            defaultValue={endDate}
            required
            onChange={(e) => setEndDate(e.target.value)}
            disabled={submit}
          />
        </div>

        <div className="reportFilter__date-end">
          <label>Year Quarter</label>
          <select
            onChange={(e) => setSelectQuarter(e.target.value)}
            disabled={submit}
          >
            <option value="">Select Quarter</option>
            <option value="q1">Q1</option>
            <option value="q2">Q2</option>
            <option value="q3">Q3</option>
            <option value="q4">Q4</option>
          </select>
        </div>

        <p className="NoteMessage">
          Please note: You can select either a specific date range or a
          quarterly period
        </p>
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
            disabled={submit}
          />
        </div>
        <div className="reportFilter__checkbox-inputs">
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalInvoices}
              onChange={() => handleCheckboxChange("totalInvoices")}
              disabled={submit}
            />
            <label>Total invoices</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.averageInvoice}
              onChange={() => handleCheckboxChange("averageInvoice")}
              disabled={submit}
            />
            <label>Average invoice</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalDiscount}
              onChange={() => handleCheckboxChange("totalDiscount")}
              disabled={submit}
            />
            <label>Total Discount</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalTax}
              onChange={() => handleCheckboxChange("totalTax")}
              disabled={submit}
            />
            <label>Total Tax</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.totalCustomers}
              onChange={() => handleCheckboxChange("totalCustomers")}
              disabled={submit}
            />
            <label>Total Customers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={checkboxes.invoicesByStatus}
              onChange={() => handleCheckboxChange("invoicesByStatus")}
              disabled={submit}
            />
            <label>Invoices by status</label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="reportFilter__buttons">
        {!submit && !downloadReady ? (
          <button onClick={handleSubmitForm} className="btn">
            Apply
          </button>
        ) : downloadReady ? (
          // <button className="btn" onClick={submitDownloadReport}>
          //   Download
          // </button>
          <ReportPDF />
        ) : (
          <span className="btn loading-btn">
            <span className="loadingBtn"></span>
          </span>
        )}
        {downloadReady || (
          <button disabled={submit} className="btn">
            Reset
          </button>
        )}{" "}
      </div>
    </article>
  );
};

export default ReportForm;
