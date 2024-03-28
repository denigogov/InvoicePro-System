import LoadingRing from "../GlobalComponents/LoadingRing";
import companyLogo from "../../assets/truck-long-svgrepo-com.svg";
import { useRef } from "react";
import { CredentialsTypes } from "../../types/loginType";

interface LoginFormProps {
  error: String;
  loading: boolean;
  handleLogin: (e: CredentialsTypes) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  error,
  loading,
  handleLogin,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const credentials: CredentialsTypes = Object.fromEntries(
      formData.entries()
    );

    handleLogin(credentials);
  };

  return (
    <div className="loginForm">
      <div className="loginForm__comapny">
        <span className="loginForm__comapny_name">All Transport</span>
        <br />
        InvoicePro System
      </div>

      <div className="loginForm__logo">
        <img alt="login-logo" src={companyLogo} />
      </div>

      <form onSubmit={handleClickLogin}>
        <input
          required
          type="text"
          name="email"
          ref={emailRef}
          // defaultValue="owner@gmail.com"
          placeholder="email"
          list="accounts"
        />
        <input
          required
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="password"
        />
        <button>Sign in</button> <p className="errorMessage">{error}</p>
      </form>
      {loading && <LoadingRing />}
    </div>
  );
};

export default LoginForm;
