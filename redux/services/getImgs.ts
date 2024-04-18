'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type imgProduct = {
 
};


export const ImgProductGet = createApi({
  reducerPath: "ImgProductGet",
  refetchOnFocus: true, 
  baseQuery: fetchBaseQuery({
    baseUrl: "/carrito", 
  }),
  endpoints: (builder) => ({
    getCarrito: builder.query<imgProduct[], null>({
      query: () => "imgProduct",
    }),
    getimgProductByIdProduct: builder.query<imgProduct, string>({
      query: (id) => `imgProduct/${id}`,
    }),
  }),
});

export const { useGetCarritoQuery, useGetimgProductByIdProductQuery } = ImgProductGet;
