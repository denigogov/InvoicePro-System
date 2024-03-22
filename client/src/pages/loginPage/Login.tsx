import "../../Styling/Pages/_login.scss";
import { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import { Outlet } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div>
      <LoginForm loading={loading} error={error} />

      {/* Main outlet */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Login;
