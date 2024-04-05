import "../../Styling/Components/GlobalComponentStyle/_errorMinimalDisplay.scss";

interface ErrorMinimalDisplayProps {
  errorMessage: string;
}

const ErrorMinimalDisplay: React.FC<ErrorMinimalDisplayProps> = ({
  errorMessage,
}) => {
  return <div className="errorMinimalDisplay">{errorMessage}</div>;
};

export default ErrorMinimalDisplay;
