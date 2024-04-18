import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserList } from "@/app/types/typeUser";

interface InitialState {
    user: UserList
}

const initialState: InitialState = {
    user: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        agregarUser: (state, action: PayloadAction<User>) => {
            state.user.push(action.payload);
        },
        logOutUser: (state) => {
            state.user.pop();
        }
    }
});

export const { agregarUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
