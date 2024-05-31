export interface FetchAllUsersTypes {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  departmentName: string;
}

export interface UpdateUserTypes {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  password: string;
}
