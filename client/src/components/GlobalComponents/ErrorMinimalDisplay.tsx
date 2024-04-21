import "../../Styling/Components/GlobalComponentStyle/_errorMinimalDisplay.scss";

interface ErrorMinimalDisplayProps {
  errorMessage: string;
}

// ERROR FOR THE API WHEN THE API LINK IS BROKEN OR SIMULAR !
const ErrorMinimalDisplay: React.FC<ErrorMinimalDisplayProps> = ({
  errorMessage,
}) => {
  return <div className="errorMinimalDisplay">{errorMessage}</div>;
};

export default ErrorMinimalDisplay;
