'use client'
import { Products } from "@/app/types/typeProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Definir una clave para el localStorage
const CARRITO_STORAGE_KEY = 'carrito';
const PAYMENT_ID = 'paymentId';

// Obtener el carrito del localStorage si está disponible
const carritoFromLocalStorage = localStorage.getItem(CARRITO_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY)!)
  : [];

const paymentFromLocalStorage = localStorage.getItem(PAYMENT_ID)
  ? JSON.parse(localStorage.getItem(PAYMENT_ID)!)
  : [];

interface Carrito {
    carrito: Products[];
    token: string[];
    paymentId: string[];
}

const initialState: Carrito = {
    carrito: carritoFromLocalStorage,
    token: [],
    paymentId: paymentFromLocalStorage
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
        },
        deleteCarrito: (state) =>{
            state.carrito = []
            localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(state.carrito));

        },
        agregarToken: (state, action) => {
            !state.token.length && state.token.push(action.payload);
        },
        eliminarToken: (state) => {
            state.token = [];
        },
        agregarPaymentId: (state, action) => {
            !state.paymentId.length && state.paymentId.push(action.payload);
            localStorage.setItem(PAYMENT_ID, JSON.stringify(state.paymentId));
        },
        eliminarPaymentId: (state) => {
            state.paymentId = [];
            localStorage.setItem(PAYMENT_ID, JSON.stringify(state.paymentId));
        }
    }
});

export const { agregarCarrito, removeCarrito, deleteCarrito, agregarToken, eliminarToken, agregarPaymentId, eliminarPaymentId } = CarritoSlice.actions;

export default CarritoSlice.reducer;
