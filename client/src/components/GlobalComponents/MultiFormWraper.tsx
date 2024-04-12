import { ReactNode } from "react";
import "../../Styling/Components/GlobalComponentStyle/_multiFormWraper.scss";

interface MultiFormWraperProps {
  children: ReactNode;
  title?: string;
}

const MultiFormWraper: React.FC<MultiFormWraperProps> = ({
  title,
  children,
}) => {
  return (
    <>
      {title && <h3 className="multiFormWraper__title">{title}</h3>}
      <div className="multiForm-wrap__children ">{children}</div>
    </>
  );
};

export default MultiFormWraper;
