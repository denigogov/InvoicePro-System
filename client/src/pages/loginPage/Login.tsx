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
      console.log("dataCall", data);

      return data as any;
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const handleConfirmBtn = async (code: string) => {
    try {
      const { token } = await confirmLogin(code);
      auth.setConfirmToken("");

      if (token.length) auth.login(token);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div>
      {!auth.validateToken?.length ? (
        <>
          <LoginForm
            loading={loading}
            error={error}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <ConfirmCode handleConfirmBtn={handleConfirmBtn} />
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
