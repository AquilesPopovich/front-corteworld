import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/app/types/typeUser"; 



interface InitialState {
    user: User | null;
}

const initialState: InitialState = {
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        agregaruser: (state, action: PayloadAction<User | null>) => {
            if (state !== null) {
                state.user = action.payload; // Actualiza el estado con el nuevo usuario
            }
        },
        
        
        
        removeuser: (state, action: PayloadAction<string>) => {
            if (state.user && state.user.id === action.payload) {
                state.user = null;
            }
        },
        
        
    }
});

export const { agregaruser, removeuser } = userSlice.actions;

export default userSlice.reducer;
