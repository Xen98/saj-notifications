export interface User {
  id: number;
  name: string;
  user: string;
}

export interface UserResponse {
  message: string;
  data: User;
}
