import { Link } from "react-router-dom";
import "../../Styling/Components/GlobalComponentStyle/_error404.scss";
import logo from "../../assets/logo1.svg";
import service1 from "../../assets/dashboardIcon.svg";
import service2 from "../../assets/settingsIcon.svg";
import service3 from "../../assets/userIcon.svg";

const Error404: React.FC = () => {
  return (
    <div className="error404Container">
      <div className="error404Container__logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="error404Container__text">
        <p className="error404Container__text-status">404</p>
        <p className="error404Container__text-title">
          This Page does not exist
        </p>
        <p className="error404Container__text-footer">
          Sorry, We couldn't find the page you're looking for
        </p>
      </div>

      <div className="error404Container__links">
        <ul>
          <li>
            <img src={service1} alt="serviceICon" />
            <span className="error404Container__links-text">
              <p className="error404Container__links-title">Documentation</p>
              <p className="error404Container__links-subTitle">
                custom css inspire from tailwind
              </p>
            </span>
            <p className="error404Container__links-arrow"> &#62;</p>
          </li>

          <li>
            <img src={service2} alt="serviceICon" />
            <span className="error404Container__links-text">
              <p className="error404Container__links-title">Setup</p>
              <p className="error404Container__links-subTitle">
                Work in progress
              </p>
            </span>
            <p className="error404Container__links-arrow"> &#62;</p>
          </li>

          <Link to={"https://www.linkedin.com/in/dejangogov/"} target="blank">
            <li>
              <img src={service3} alt="serviceICon" />
              <span className="error404Container__links-text">
                <p className="error404Container__links-title">Contact</p>
                <p className="error404Container__links-subTitle">
                  Discover more about my professional journey
                </p>
              </span>
              <p className="error404Container__links-arrow"> &#62;</p>
            </li>
          </Link>
        </ul>
      </div>

      <div className="error404Container__linkHome">
        <Link to="dashboard" className="error404Container__linkHome-link">
          &#8617; Back to home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
