export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
 
export interface AdminLoginPayload {
  email: string;
  password: string;
}
 
export interface AdminLoginData {
  token: AuthTokens;
}
 
