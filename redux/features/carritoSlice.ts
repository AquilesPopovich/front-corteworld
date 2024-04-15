'use client'

import { Products } from "@/app/types/typeProduct"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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
        agregarCarrito: (state, action: PayloadAction<Products>) => {
            state.carrito.push(action.payload)
        },
        removeCarrito: (state, action: PayloadAction<string>) =>{
            state.carrito = state.carrito.filter(producto => producto.id !== action.payload)
        }
    }
})

export const { agregarCarrito, removeCarrito} = CarritoSlice.actions

export default CarritoSlice.reducer

