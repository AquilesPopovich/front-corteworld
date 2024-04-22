'use client'
import { Products } from "@/app/types/typeProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Definir una clave para el localStorage
const CARRITO_STORAGE_KEY = 'carrito';

// Obtener el carrito del localStorage si está disponible
const carritoFromLocalStorage = localStorage.getItem(CARRITO_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY)!)
  : [];

interface Carrito {
    carrito: Products[];
}

const initialState: Carrito = {
    carrito: carritoFromLocalStorage,
};

export const CarritoSlice = createSlice({
    name: 'carrito',
    initialState,
    reducers: {
        agregarCarrito: (state, action: PayloadAction<Products>) => {
            state.carrito.push(action.payload);
            // Guardar el estado del carrito en localStorage después de agregarlo
            localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(state.carrito));
        },
        removeCarrito: (state, action: PayloadAction<string>) => {
            state.carrito = state.carrito.filter(producto => producto.id !== action.payload);
            // Guardar el estado del carrito en localStorage después de eliminar un producto
            localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(state.carrito));
        }
    }
});

export const { agregarCarrito, removeCarrito } = CarritoSlice.actions;

export default CarritoSlice.reducer;
