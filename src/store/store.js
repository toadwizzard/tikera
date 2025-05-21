import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./slices/userDataSlice";
import { moviesApi } from "./slices/moviesApiSlice";

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        moviesApi: moviesApi.reducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(moviesApi.middleware)
})