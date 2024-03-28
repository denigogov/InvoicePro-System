export interface LoginApiTypes {
  success: boolean;
  payload: {
    id: number;
    type: number;
    name: string;
  };
}

export interface CredentialsTypes {
  email?: string;
  password?: string;
}
