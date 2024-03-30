import { useState } from "react";
import ConfirmCode from "../../components/Login/ConfirmCode";
import { useAuth } from "../../helpers/Auth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Confirm: React.FC = ({}) => {
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<string>("");

  const auth = useAuth();
  const navigate = useNavigate();

  const confirmLogin = async (confirmCode: string) => {
    setLoadingConfirm(true);
    try {
      const response = await fetch(`${API_URL}/login/confirm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.validateToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth: confirmCode }),
      });
      const data = await response.json();

      if (data?.error) {
        throw new Error(data?.error);
      }

      return data as any;
    } catch (err) {
      setConfirmError(`${err}`);
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleConfirmBtn = async (code: string) => {
    const { token } = await confirmLogin(code);

    if (token?.length) {
      auth.login(token);
      localStorage.removeItem("userAccess");
      navigate("/");
    }
  };

  return (
    <div>
      <ConfirmCode
        handleConfirmBtn={handleConfirmBtn}
        loadingConfirm={loadingConfirm}
        confirmError={confirmError}
      />
    </div>
  );
};

export default Confirm;
