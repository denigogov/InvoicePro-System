import "../../Styling/Components/GlobalComponentStyle/_floatMenu.scss";
import iconTest from "../assets/passwordIcon.svg";

const FloatMenu: React.FC = () => {
  return (
    <div className="toggleMenu">
      <div className="container">
        {/* Replace this input tag */}
        <input type="checkbox" id="toggle" />

        <label className="button" htmlFor="toggle">
          <nav className="nav">
            <ul>
              <li>
                <a href="#0">
                  <i className="ri-mic-line">
                    <img src={iconTest} alt="iconTest" />
                  </i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="ri-message-2-line">
                    <img src={iconTest} alt="iconTest" />
                  </i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="ri-file-line">
                    {" "}
                    <img src={iconTest} alt="iconTest" />
                  </i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="ri-send-plane-2-line">
                    <img src={iconTest} alt="iconTest" />
                  </i>
                </a>
              </li>
            </ul>
          </nav>
        </label>
      </div>
    </div>
  );
};

export default FloatMenu;
