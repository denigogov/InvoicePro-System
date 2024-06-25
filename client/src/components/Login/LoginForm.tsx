import LoadingRing from "../GlobalComponents/LoadingRing";
import { useRef, useState } from "react";
import { CredentialsTypes } from "../../types/loginType";
import { Link } from "react-router-dom";
import Logo from "./Logo";

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
      <Logo />

      <form onSubmit={handleClickLogin}>
        <input
          required
          type="email"
          name="email"
          ref={emailRef}
          defaultValue="guest@nexigo.com"
          placeholder="email"
        />
        <div className="passwordShow">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            ref={passwordRef}
            placeholder="password"
            defaultValue="guest123!"
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

      <p className="passwordlink">
        Forgot your password?{" "}
        <Link className="linkPassword" to="password-reset">
          Reset it
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
