export type TokenType = string | null;

export interface UserInfoType {
  id?: number;
  username?: string;
  type?: number;
}

export type AuthContextType = {
  token?: TokenType;
  userInfo?: UserInfoType | null;
  login: (token: string) => void;
  info: (userInfo: UserInfoType) => void;
  logout: () => void;
  setConfirmToken: (validateToken: TokenType) => void;
  validateToken?: TokenType;
};
