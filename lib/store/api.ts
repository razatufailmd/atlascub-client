import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

// Error type definition
interface ApiError {
  status?: number;
  data?: unknown;
  message?: string;
}

// Axios base query configuration
export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }) =>
  async ({
    url,
    method = "GET",
    data,
    params,
    headers,
  }: AxiosRequestConfig) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials: true, // Important for cookies/sessions
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ message?: string }>;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        } as ApiError,
      };
    }
  };

// API Tags for cache invalidation
export const API_TAGS = {
  PRODUCT: "Product",
  PRODUCTS: "Products",
  CATEGORY: "Category",
  ORDER: "Order",
  ORDERS: "Orders",
  USER: "User",
  WISHLIST: "Wishlist",
  CART: "Cart",
  COLLECTION: "Collection",
} as const;

export type APITagType = (typeof API_TAGS)[keyof typeof API_TAGS];

// Initialize API service with base configuration
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/",
  }),
  tagTypes: Object.values(API_TAGS) as APITagType[],
  endpoints: () => ({}),
  // Keep unused data for 60 seconds before garbage collection
  keepUnusedDataFor: 60,
  // Refetch when window regains focus
  refetchOnFocus: false,
  // Refetch when network reconnects
  refetchOnReconnect: true,
  // Refetch when mount
  refetchOnMountOrArgChange: false,
});

// Export hooks for use in components (will be populated by injected endpoints)
export const {
  // These will be populated when endpoints are injected
  usePrefetch,
} = api;
