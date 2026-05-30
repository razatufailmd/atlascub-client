"use client";

import {
  mockProducts,
  getProductById,
  getProductBySlug,
  getProductsByGender,
  getProductsByCategory,
  getNewArrivals,
  getBestSellers,
} from "@/lib/mock/products";
import {
  genderCategories,
  getCategoryBySlug,
  getAllCategories,
} from "@/lib/mock/categories";
import {
  mockCollections,
  getCollectionBySlug,
  getCollectionsByType,
} from "@/lib/mock/collections";
import { mockOrders, getOrderById, getOrdersByStatus } from "@/lib/mock/orders";

// This hook will eventually be replaced with real API calls
// For now, it returns mock data
export function useMockData() {
  return {
    // Products
    products: mockProducts,
    getProductById,
    getProductBySlug,
    getProductsByGender,
    getProductsByCategory,
    getNewArrivals,
    getBestSellers,

    // Categories
    genderCategories,
    getCategoryBySlug,
    getAllCategories,

    // Collections
    collections: mockCollections,
    getCollectionBySlug,
    getCollectionsByType,

    // Orders
    orders: mockOrders,
    getOrderById,
    getOrdersByStatus,
  };
}

// Direct exports for non-hook usage
export {
  mockProducts,
  getProductById,
  getProductBySlug,
  getProductsByGender,
  getProductsByCategory,
  getNewArrivals,
  getBestSellers,
  genderCategories,
  getCategoryBySlug,
  getAllCategories,
  mockCollections,
  getCollectionBySlug,
  getCollectionsByType,
  mockOrders,
  getOrderById,
  getOrdersByStatus,
};
