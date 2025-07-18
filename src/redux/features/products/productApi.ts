import { baseApi } from "@/redux/api/baseApi";

export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
