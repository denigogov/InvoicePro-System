import "../../Styling/Components/GlobalComponentStyle/_progressBar.scss";

type ProgressBarProps = {
  currentStepIndex: number;
  step1Name: string;
  step2Name: string;
  step3Name: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  step1Name,
  step2Name,
  step3Name,
}) => {
  return (
    <div className="progressBar__wraper">
      <section className="step-wizard">
        <ul className="step-wizard-list">
          <li
            className={
              currentStepIndex === 0
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">1</span>
            <span className="progress-label">{step1Name ?? ""}</span>
          </li>
          <li
            className={
              currentStepIndex === 1
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">2</span>
            <span className="progress-label">{step2Name ?? ""}</span>
          </li>
          <li
            className={
              currentStepIndex === 2
                ? "step-wizard-item  active"
                : "step-wizard-item"
            }
          >
            <span className="progress-count">3</span>
            <span className="progress-label">{step3Name ?? ""}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ProgressBar;
