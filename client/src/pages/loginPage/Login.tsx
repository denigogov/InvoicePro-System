import "../../Styling/Pages/_login.scss";
import { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import { Outlet } from "react-router-dom";
import { CredentialsTypes } from "../../types/loginType";
import { useAuth } from "../../helpers/Auth";
import ConfirmCode from "../../components/Login/ConfirmCode";

interface LoginProps {}

const API_URL = import.meta.env.VITE_API_URL as string;

const Login: React.FC<LoginProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<string>("");

  const auth = useAuth();

  const loginResponse = async (credentials: CredentialsTypes) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }

      return data.token as string;
    } catch (err) {
      const requestError = (err as Error).stack;
      console.log(requestError);
      setError(
        requestError?.includes("Too")
          ? "Too Many Request, Please Try later ! "
          : `Invalid Credentials`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials: CredentialsTypes) => {
    const token = await loginResponse(credentials);

    if (token?.length) {
      auth.setConfirmToken(token);
    }
  };

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

      console.log(data);

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
    }
  };

  console.log(auth.validateToken);

  return (
    <div>
      {!auth.validateToken?.length && !auth.token?.length ? (
        <>
          {auth.validateToken?.length || (
            <LoginForm
              loading={loading}
              error={error}
              handleLogin={handleLogin}
            />
          )}
        </>
      ) : (
        <>
          {auth.validateToken?.length && (
            <ConfirmCode
              handleConfirmBtn={handleConfirmBtn}
              loadingConfirm={loadingConfirm}
              confirmError={confirmError}
            />
          )}
        </>
      )}

      {/* Main outlet */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Login;
