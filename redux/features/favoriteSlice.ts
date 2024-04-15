'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Product = {
    id: number
    name: string
    price: number
    mark: string
    status: string 
    stock: number
    discount: number
    category: string
    destacado: boolean
  };


interface FavoritesState {
    favorites: Product[];
}

const initialState: FavoritesState = {
    favorites: []
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Product>) =>{
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(product => product.id !== action.payload);
        }
    }
})

export const { addFavorite, removeFavorite} = favoritesSlice.actions

export default favoritesSlice.reducer