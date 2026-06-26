export function getAuthToken(): string | null {
  return localStorage.getItem("access_token");
}
