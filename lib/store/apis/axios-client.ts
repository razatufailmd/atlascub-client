import axios from "axios";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Clerk token from cookies
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token from Clerk's session cookie
      // The token is automatically available in the cookie
      // We need to read it from the request or use Clerk's helper

      // For client-side, we can use Clerk's getToken
      const { getToken } = await import("@clerk/nextjs");
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Failed to get Clerk token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - please sign in again");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
