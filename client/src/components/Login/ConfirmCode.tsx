import "../../Styling/Components/LoginComponent/_confirmCode.scss";
import mailTruck from "../../assets/mailTruck.svg";
import { useRef } from "react";

interface ConfirmCodeProps {
  handleConfirmBtn: (code: string) => Promise<void>;
}

const ConfirmCode: React.FC<ConfirmCodeProps> = ({ handleConfirmBtn }) => {
  const confirmCodeRef = useRef<HTMLInputElement>(null);

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    const authCode = confirmCodeRef.current?.value ?? "";

    handleConfirmBtn(authCode);
  };

  return (
    <div className="confirmCode">
      <div className="confirmCode__image">
        <img src={mailTruck} alt="mailTruck" />
      </div>

      <div className="confirmCode__text">
        <h2 className="confirmCode__text-header">Two Factor Authentication</h2>
        <p className="confirmCode__text-subTitle">
          A verification code has been sent to your email. Please enter the code
          below.
        </p>
        <form onSubmit={handleConfirmation}>
          <label></label> <br />
          <input type="text" ref={confirmCodeRef} />
          <button>login</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmCode;
