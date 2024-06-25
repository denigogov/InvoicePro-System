import { createContext, useState, ReactNode } from "react";
import { UserInfoType, AuthContextType, TokenType } from "../types/AuthType";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<TokenType>(
    localStorage.getItem("accessKey") ?? null
  );

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const [validateToken, setValidateToken] = useState<TokenType>(
    localStorage.getItem("userAccess") ?? null
  );

  const login = (token?: TokenType) => {
    if (token && token?.length) {
      localStorage.setItem("accessKey", token);
      setToken(token);
    }
  };

  const info = (userInfo: UserInfoType) => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    setToken(null);
    setValidateToken(null);
    localStorage.removeItem("userAccess");
    localStorage.removeItem("accessKey");
  };

  const setConfirmToken = (validateToken: TokenType) => {
    if (validateToken && validateToken?.length) {
      localStorage.setItem("userAccess", validateToken);
      setValidateToken(validateToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        info,
        userInfo,
        token,
        login,
        logout,
        setConfirmToken,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
