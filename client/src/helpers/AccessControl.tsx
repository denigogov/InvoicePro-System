import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ReactNode } from "react";

interface AccessControlProps {
  children: ReactNode;
}

const AccessControl: React.FC<AccessControlProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth.userInfo);

  if (!auth.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};

export default AccessControl;
