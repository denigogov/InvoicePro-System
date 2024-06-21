import companyLogo from "../../assets/logo1.svg";

const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;
