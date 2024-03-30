import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";
import { ReactNode } from "react";

interface UserLoggedinProps {
  children: ReactNode;
}

export const UserLoggedin: React.FC<UserLoggedinProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.token?.length) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
