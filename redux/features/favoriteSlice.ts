'use client'
import { Products } from "@/app/types/typeProduct"
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const FAVORITO_STORAGE_KEY = "favorito";

const favoritoFromLocalStorage = localStorage.getItem(FAVORITO_STORAGE_KEY) ? JSON.parse(localStorage.getItem(FAVORITO_STORAGE_KEY)!) : []



interface FavoritesState {
    favorites: Products[];
}

const initialState: FavoritesState = {
    favorites: favoritoFromLocalStorage
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Products>) =>{
            state.favorites.push(action.payload);
            localStorage.setItem(FAVORITO_STORAGE_KEY, JSON.stringify(state.favorites));

        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(product => product.id !== action.payload);
            localStorage.setItem(FAVORITO_STORAGE_KEY, JSON.stringify(state.favorites));

        }
    }
})

export const { addFavorite, removeFavorite} = favoritesSlice.actions

export default favoritesSlice.reducer