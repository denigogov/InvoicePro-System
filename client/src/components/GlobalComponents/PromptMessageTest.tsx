import "../../Styling/Components/GlobalComponentStyle/_promptMessageTest.scss";
import editIcon from "../../assets/editIcon.svg";
interface PromptMessageTestProps {}

const PromptMessageTest: React.FC<PromptMessageTestProps> = () => {
  return (
    <div className="overlay">
      <div className="promptMessageTest popUp">
        <div className="promptMessageTest__textImage">
          <div className="promptMessageTest__textImage-image">
            <img src={editIcon} alt="editIcon" />
          </div>

          <div className="promptMessageTest__textImage-text">
            <h5>Delete your account</h5>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reprehenderit eos officiis harum at sunt molestiae nobis?
            </p>
          </div>
        </div>

        <div className="promptMessageTest__buttons">
          <button className="promptMessageTest__buttons-cancelBtn">
            Cancel
          </button>
          <button className="promptMessageTest__buttons-actionBtn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptMessageTest;
