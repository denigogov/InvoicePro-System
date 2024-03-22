import LoadingRing from "../GlobalComponents/LoadingRing";
import companyLogo from "../../assets/truck-long-svgrepo-com.svg";

interface LoginFormProps {
  error: String;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ error, loading }) => {
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

      <form>
        <input
          required
          type="text"
          name="email"
          // defaultValue="owner@gmail.com"
          placeholder="email"
          list="accounts"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
        />
        <button>Sign in</button> <p className="errorMessage">{error}</p>
      </form>
      {loading && <LoadingRing />}
    </div>
  );
};

export default LoginForm;
