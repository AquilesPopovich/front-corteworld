'use client'
import { Products } from "@/app/types/typeProduct"
import { PayloadAction, createSlice } from "@reduxjs/toolkit";




interface FavoritesState {
    favorites: Products[];
}

const initialState: FavoritesState = {
    favorites: []
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Products>) =>{
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(product => product.id !== action.payload);
        }
    }
})

export const { addFavorite, removeFavorite} = favoritesSlice.actions

export default favoritesSlice.reducer