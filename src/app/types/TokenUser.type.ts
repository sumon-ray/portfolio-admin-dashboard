export interface ITokenUser {
  name: string;
  email: string;
  id: string;
  role: "USER" | "ADMIN";
  profileImage?: string;
  iat: number;
  exp: number;
}
