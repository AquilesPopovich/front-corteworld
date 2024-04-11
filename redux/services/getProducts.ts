'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Product = {
  id: number
  name: string
  price: number
  mark: string
  status: string //agregar en el back
  stock: number
  discount: number
  category: string
  favorite: boolean
};


export const productGet = createApi({
  reducerPath: "productGet",
  refetchOnFocus: true, 
  baseQuery: fetchBaseQuery({
    baseUrl: "/product", 
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "product",
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productGet;
