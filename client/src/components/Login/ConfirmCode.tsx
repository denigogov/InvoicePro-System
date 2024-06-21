import "../../Styling/Components/LoginComponent/_confirmCode.scss";
import mailTruck from "../../assets/mailTruck.svg";
import { useRef, useState } from "react";
import LoadingRing from "../GlobalComponents/LoadingRing";
import CodeResend from "./CodeResend";

interface ConfirmCodeProps {
  handleConfirmBtn: (code: string) => Promise<void>;
  confirmError: string;
  loadingConfirm: boolean;
}

const ConfirmCode: React.FC<ConfirmCodeProps> = ({
  handleConfirmBtn,
  confirmError,
  loadingConfirm,
}) => {
  const confirmCodeRef = useRef<HTMLInputElement>(null);
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    const authCode = confirmCodeRef.current?.value ?? "";

    handleConfirmBtn(authCode);
  };

  const popupWindow = () => {
    setPopupOpen((x) => !x);
  };

  const handleBackToLogin = () => {
    console.log("need to make user to be able to return to login view");
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
          <input type="text" ref={confirmCodeRef} required maxLength={8} />
          <button>login</button>
        </form>
        <br />
        <p className="errorMessage">{confirmError}</p>

        {loadingConfirm && <LoadingRing />}

        <p className="resendCode" onClick={() => setPopupOpen((e) => !e)}>
          Didn't Receive Code?
        </p>
        <br />
        <p className="resendCode" onClick={handleBackToLogin}>
          back to login
        </p>
      </div>

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp smPopup" onClick={(e) => e.stopPropagation()}>
            <CodeResend setPopupOpen={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default ConfirmCode;
