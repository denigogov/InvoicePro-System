import { ReactNode } from "react";
import "../../Styling/Components/GlobalComponentStyle/_multiFormWraper.scss";

interface MultiFormWraperProps {
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

const MultiFormWraper: React.FC<MultiFormWraperProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div className="multiFormWraper">
      {title && <h3 className="multiFormWraper__title">{title}</h3>}
      {subTitle && <p className="multiFormWraper__subTitle">{subTitle}</p>}
      <div className="multiFormWraper__children">{children}</div>
    </div>
  );
};

export default MultiFormWraper;
