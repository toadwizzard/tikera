import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: null,
        role: "visitor",
        name: null,
    },
    token: null
}

const userData = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        login: (state, {payload}) => {
            state.user.id = payload.user.id;
            state.user.role = payload.user.role;
            state.user.name = payload.user.name;
            state.token = payload.token;
        },
        logout: () => {
            return initialState;
        }
    }
})

export const { reducer: userDataReducer } = userData;
export const { login, logout } = userData.actions;