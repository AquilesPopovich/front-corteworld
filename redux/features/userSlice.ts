'use client'
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserList } from "@/app/types/typeUser";

// Definir una clave para el localStorage
const USER_STORAGE_KEY = 'user';

// Obtener el usuario del localStorage si está disponible
const userFromLocalStorage = localStorage.getItem(USER_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!)
    : [];

interface InitialState {
    user: UserList
}

const initialState: InitialState = {
    user: userFromLocalStorage,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        agregarUser: (state, action: PayloadAction<User>) => {
            state.user.push(action.payload);
            // Guardar el estado del usuario en localStorage después de agregarlo
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
        },
        logOutUser: (state) => {
            state.user.pop();
            // Guardar el estado del usuario en localStorage después de cerrar sesión
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
        },
    }
});

export const { agregarUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
