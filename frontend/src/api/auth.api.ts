import api from "./axios";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto extends LoginDto {
  user_role: "INSTRUCTOR" | "STUDENT";
}

export const loginUser = (data: LoginDto) =>
  api.post<{ access_token: string }>("/auth/login", data);

export const signupUser = (data: SignupDto) =>
  api.post("/user", data);