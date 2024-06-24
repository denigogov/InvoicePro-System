import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/Login/Logo";
import PasswordChangeForm from "../../components/Login/PasswordChangeForm";
import { useEffect, useState } from "react";
import {
  changePasswordRequest,
  passwordResetTokenConfirm,
} from "../../api/loginAPI";
import { apiGeneralErrorHandle } from "../../components/GlobalComponents/ErrorShow";
import { successMessageWithNavigation } from "../../components/GlobalComponents/successPrompt";
import LoadingRing from "../../components/GlobalComponents/LoadingRing";

const PasswordChange: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(false);
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    const confirmToken = async () => {
      try {
        await passwordResetTokenConfirm(token ?? "");
        setValidToken(true);
      } catch (err) {
        console.log(err);
        setValidToken(false);
      } finally {
        setLoading(false);
      }
    };

    confirmToken();
  }, [token]);

  const submitPasswordChange = async (query: string) => {
    try {
      await changePasswordRequest(token ?? "", query);

      successMessageWithNavigation(
        "Your password has been successfully changed",
        navigate,
        3000
      );
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="loginForm">
      <Logo />
      {loading ? (
        <LoadingRing />
      ) : validToken ? (
        <PasswordChangeForm submitPasswordChange={submitPasswordChange} />
      ) : (
        <div>
          <h4 className="passwordResetForm__wrap__text-subTitle">
            The password reset link is invalid or has already been used. Please
            check the link or request a new password reset link
          </h4>
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
