import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import favoriteSliceReducer from "./features/favoriteSlice"; // Asegúrate de importar el reducer correctamente

export const store = configureStore({
    reducer: {
        counter: counterReducer, // Asigna el reducer del contador con la clave 'counter'
        favorites: favoriteSliceReducer // Asigna el reducer de favoritos con la clave 'favorites'
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
