'use client'

import { Products } from "@/app/types/typeProduct"
import { createSlice } from "@reduxjs/toolkit"

interface Carrito {
    carrito: Products[]
}

const initialState: Carrito = {
    carrito: []
}

export const CarritoSlice = createSlice({
    name: 'carrito',
    initialState,
    reducers: {
        createCarrito: (state, action) => {
            state.carrito = [...action.payload]
        }
    }
})