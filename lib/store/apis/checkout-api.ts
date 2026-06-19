import { api, API_TAGS } from "../api";
import { CartItem } from "../features/cartSlice";
import {
  InitiateCheckoutPayload,
  OrderResponse,
  RazorpayOrderResponse,
} from "@/types/checkout";

// Helper to map Redux cart items to checkout format
export function mapCartItemsToCheckout(cartItems: CartItem[]) {
  return cartItems.map((item) => ({
    productId: item.productId,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  }));
}

// Define a proper custom error type
export interface CustomApiError {
  status: number;
  data?: {
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
  };
  message?: string;
}

// Type guard tailored for RTK Query + Axios base query format
export function isApiError(error: any): error is CustomApiError {
  return error && typeof error === "object" && "status" in error;
}

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Initiate checkout - create order and get Razorpay details
    initiateCheckout: builder.mutation<
      RazorpayOrderResponse,
      InitiateCheckoutPayload
    >({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        data,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),

    // Get order by ID
    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: API_TAGS.ORDER, id }],
    }),

    // Get order by order number (for success page)
    getOrderByNumber: builder.query<OrderResponse, string>({
      query: (orderNumber) => ({
        url: `/orders/number/${orderNumber}`,
        method: "GET",
      }),
      providesTags: (result, error, orderNumber) => [
        { type: API_TAGS.ORDER, id: orderNumber },
      ],
    }),

    // Get user's orders (for order history)
    getUserOrders: builder.query<
      {
        data: OrderResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/orders/user`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [API_TAGS.ORDERS],
    }),

    // Get all orders (admin only)
    getAllOrders: builder.query<
      {
        data: OrderResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      },
      { status?: string; page?: number; limit?: number }
    >({
      query: ({ status, page = 1, limit = 10 }) => ({
        url: `/orders`,
        method: "GET",
        params: { status, page, limit },
      }),
      providesTags: [API_TAGS.ORDERS],
    }),

    // Update order status (admin only)
    updateOrderStatus: builder.mutation<
      OrderResponse,
      { id: string; status: string; trackingNumber?: string }
    >({
      query: ({ id, status, trackingNumber }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        data: { status, trackingNumber },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: API_TAGS.ORDER, id },
        { type: API_TAGS.ORDERS },
      ],
    }),

    // Update order tracking number (admin only)
    updateOrderTracking: builder.mutation<
      OrderResponse,
      { id: string; trackingNumber: string }
    >({
      query: ({ id, trackingNumber }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        data: { trackingNumber },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: API_TAGS.ORDER, id },
        { type: API_TAGS.ORDERS },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useInitiateCheckoutMutation,
  useGetOrderByIdQuery,
  useGetOrderByNumberQuery,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateOrderTrackingMutation,
} = checkoutApi;
