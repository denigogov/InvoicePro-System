import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/Login/Logo";

interface PasswordChangeProps {}

const PasswordChange: React.FC<PasswordChangeProps> = ({}) => {
  const navigate = useNavigate();
  let location = useLocation();

  console.log(location.search.substring(2));

  let { token } = useParams();

  // removing the token=? with substring

  console.log(token);

  return (
    <div>
      <Logo />
    </div>
  );
};

export default PasswordChange;
