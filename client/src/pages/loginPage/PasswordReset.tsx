import { useState } from "react";
import { requestNewPassword } from "../../api/userAPI";
import { apiGeneralErrorHandle } from "../../components/GlobalComponents/ErrorShow";
import Logo from "../../components/Login/Logo";
import PasswordResetForm from "../../components/Login/PasswordResetForm";
import { Link } from "react-router-dom";

const PasswordReset: React.FC = () => {
  const [formSubmited, setFormSubmited] = useState<boolean>(false);
  const submitRequestPassword = async (query: string) => {
    try {
      await requestNewPassword({ email: query });
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };
  return (
    <div className="loginForm">
      <Logo />

      {!formSubmited && (
        <PasswordResetForm
          submitRequestPassword={submitRequestPassword}
          setFormSubmited={setFormSubmited}
        />
      )}

      {/* Styling in PasswordResetForm */}
      {formSubmited && (
        <div className="emailSend">
          <h3>Request Password Change</h3>
          <h4>You will receive a password reset email soon</h4>
          <h5>Follow the link in the email to reset your password</h5>
          <h6>Thank you!</h6>
        </div>
      )}

      <Link
        className="backlink"
        to="/login"
        onClick={() => setFormSubmited(false)}
      >
        back to login
      </Link>
    </div>
  );
};

export default PasswordReset;
