import { useRef, useState } from "react";
import "../../Styling/Components/LoginComponent/_codeResend.scss";
import emailResendIcon from "../../assets/emailresend.svg";
import { useAuth } from "../../helpers/Auth";
import LoadingRing from "../GlobalComponents/LoadingRing";
import {
  apiErrorWithFN,
  apiGeneralErrorHandle,
} from "../GlobalComponents/ErrorShow";
import { successMessage } from "../GlobalComponents/successPrompt";

interface CodeResendProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const API_URL = import.meta.env.VITE_API_URL as string;

const CodeResend: React.FC<CodeResendProps> = ({ setPopupOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();

  const handleRequest = async () => {
    const requestQuery = { email: emailRef.current?.value };
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login/resendcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.validateToken ?? ""}`,
        },
        body: JSON.stringify(requestQuery),
      });
      const data = await response.json();

      if (data?.success === false) {
        throw new Error(
          "Sorry, your verification code has expired. Please log in again to receive a new code."
        );
      }

      if (!response.ok) {
        throw new Error("Invalid Email");
      } else {
        successMessage();
      }

      return data as string;
    } catch (err: unknown) {
      const sendNewError = (err as Error).message.includes(
        "Sorry, your verification code has expired"
      );

      sendNewError ? apiErrorWithFN(err) : apiGeneralErrorHandle(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestSend = await handleRequest();

    if (requestSend) {
      setPopupOpen(false);
    }
  };

  return (
    <div className="codeResend">
      <div className="codeResend__icon">
        <img src={emailResendIcon} alt="emailResendIcon" />
      </div>
      <div className="codeResend__input">
        <p>
          If you haven't received the verification code in your email, please
          enter your email address below. We'll resend the code to you shortly.
        </p>
        <form onSubmit={handleResendCode}>
          <input type="email" ref={emailRef} />
          <button>send</button>
        </form>
      </div>

      {loading && <LoadingRing />}
    </div>
  );
};

export default CodeResend;
