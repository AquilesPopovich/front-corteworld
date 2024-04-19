'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Product = {
  id: number
  name: string
  price: number
  mark: string
  status: boolean //agregar en el back
  stock: number
  discount: number
  category: string
  destacado: boolean
};


export const productGet = createApi({
  reducerPath: "productGet",
  refetchOnFocus: true, 
  baseQuery: fetchBaseQuery({
    baseUrl: "/products", 
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "products",
    })
  }),
});

export const { useGetProductsQuery } = productGet;
