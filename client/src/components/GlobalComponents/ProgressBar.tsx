import "../../Styling/Components/GlobalComponentStyle/_progressBar.scss";
import { StepsType } from "../../pages/Invoices/createInvoice/CreateInvoice";

type ProgressBarProps = {
  stepNames: StepsType[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ stepNames }) => {
  return (
    <div className="progressBar__wraper">
      <section className="step-wizard">
        <ul className="step-wizard-list">
          {stepNames.map((step, i) => (
            <li
              key={i}
              className={
                step?.stepIndex
                  ? "step-wizard-item  active"
                  : "step-wizard-item"
              }
            >
              <span className="progress-count">{step?.stepNumber}</span>
              <span className="progress-label">{step.stepName ?? ""}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProgressBar;
