import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireCode: React.FC<RequireAuthProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.validateToken?.length) {
    return <Navigate to="/login/confirm" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
