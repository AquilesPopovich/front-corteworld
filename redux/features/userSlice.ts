'use client'
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserList } from "@/app/types/typeUser";
import { AppDispatch } from "../store";
import axiosURL from "@/axiosConfig/axiosConfig";

// Definir una clave para el localStorage
const USER_STORAGE_KEY = 'user';

// Obtener el usuario del localStorage si está disponible
const userFromLocalStorage = localStorage.getItem(USER_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!)
    : [];

interface InitialState {
    user: UserList
    allUsers: UserList
}

const initialState: InitialState = {
    user: userFromLocalStorage,
    allUsers: []
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
        getUsers: (state, action) => {
            state.allUsers = [...action.payload]
        }
    }
});

export const getAllUsers = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await axiosURL.get('/user');
        if (data) {
            dispatch(getUsers(data));
        } else dispatch(getUsers([]));
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
}

export const { agregarUser, logOutUser, getUsers } = userSlice.actions;

export default userSlice.reducer;
