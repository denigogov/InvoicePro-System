import { useNavigate } from "react-router-dom";
import companyLogo from "../../assets/logo1.svg";
import "../../Styling/Components/_logo.scss";

interface LogoTypes {
  loadingLogo?: boolean;
}

const Logo: React.FC<LogoTypes> = ({ loadingLogo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="loginForm__company "
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/login")}
    >
      <div
        className={`loginForm__company_logo ${
          loadingLogo ? "loadingLogo" : ""
        }`}
      >
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
  );
};

export default Logo;
