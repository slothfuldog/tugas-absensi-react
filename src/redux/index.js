import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const reducers = configureStore({
    reducer: {userReducer}
})