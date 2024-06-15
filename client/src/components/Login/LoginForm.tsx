import LoadingRing from "../GlobalComponents/LoadingRing";
// import companyLogo from "../../assets/truck-long-svgrepo-com.svg";
// import companyLogo from "../../assets/logoWhite.svg";
import companyLogo from "../../assets/logo1.svg";
import { useRef, useState } from "react";
import { CredentialsTypes } from "../../types/loginType";

interface LoginFormProps {
  error: string;
  loading: boolean;
  handleLogin: (e: CredentialsTypes) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  error,
  loading,
  handleLogin,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      <div className="loginForm__company">
        <div className="loginForm__company_logo">
          <img alt="login-logo" src={companyLogo} />
        </div>

        <div className="loginForm__company_text">
          <p className="loginForm__company_text-title">
            nexi<span>go</span>
          </p>
          <p className="loginForm__company_text-slogan">
            streamline, simplify, succeed
          </p>
        </div>
      </div>

      <form onSubmit={handleClickLogin}>
        <input
          required
          type="email"
          name="email"
          ref={emailRef}
          // defaultValue="owner@gmail.com"
          placeholder="email"
        />
        <div className="passwordShow">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            ref={passwordRef}
            placeholder="password"
          />
          <p
            onClick={() => setShowPassword(!showPassword)}
            className="passwordShow-toggle"
          >
            show
          </p>
        </div>
        <button>Sign in</button> <p className="errorMessage">{error}</p>
      </form>
      {loading && <LoadingRing />}
    </div>
  );
};

export default LoginForm;
