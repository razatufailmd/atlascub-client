import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Clerk token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Axios interceptors run outside of React render cycles, so we fetch tokens
      // via window.__clerk_client if available, or dynamically import the template handler.
      const { getToken } = await import("@clerk/nextjs");

      // PASS YOUR TEMPLATE NAME HERE to get a verified asymmetric signature
      const token = await getToken({ template: "nestjs" });

      // console.log(
      //   "🔑 Token retrieved:",
      //   token ? `${token.substring(0, 50)}...` : "NO TOKEN"
      // );

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Token added to headers");
      } else {
        console.warn("⚠️ No token available - user may not be signed in");
      }
    } catch (error) {
      console.error("❌ Failed to get Clerk token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ API Error:",
      error.response?.status,
      error.response?.data
    );
    if (error.response?.status === 401) {
      console.error("Unauthorized - please sign in again");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
