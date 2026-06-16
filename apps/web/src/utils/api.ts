import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Please Remember to write the logout function
    }

    return Promise.reject(error);
  },
);

export async function axiosGet() {}
export async function axiosPost() {}
export async function axiosPatch() {}
export async function axiosDelete() {}
