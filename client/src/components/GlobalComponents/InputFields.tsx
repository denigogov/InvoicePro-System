import { ReactNode } from "react";

interface InputFieldsProps {
  children: ReactNode;
  title: string;
}

const InputFields: React.FC<InputFieldsProps> = ({ children, title }) => {
  return (
    <div className="inputFiledsGlobal">
      <p className="inputFiledsGlobal__title">{title}</p>
      <form id="inputFiledsGlobal__Form">{children}</form>
    </div>
  );
};

export default InputFields;
