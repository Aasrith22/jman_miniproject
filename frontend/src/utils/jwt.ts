export interface JwtPayload {
  sub: string;
  email: string;
  role: "INSTRUCTOR" | "STUDENT";
  iat: number;
  exp: number;
}

export const decodeJWT = (token: string): JwtPayload => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};