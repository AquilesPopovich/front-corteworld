'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Carrito = {
  userC: {

  }, productos: [{
    
  }]
};


export const carritoGet = createApi({
  reducerPath: "carritoGet",
  refetchOnFocus: true, 
  baseQuery: fetchBaseQuery({
    baseUrl: "/carrito", 
  }),
  endpoints: (builder) => ({
    getCarrito: builder.query<Carrito[], null>({
      query: () => "carrito",
    }),
    getCarritoByIdUser: builder.query<Carrito, number>({
      query: (id) => `carrito/${id}`,
    }),
  }),
});

export const { useGetCarritoQuery, useGetCarritoByIdUserQuery } = carritoGet;
