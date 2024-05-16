import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middleware/middlewares";
import { Auth } from "./auth/auth";

const store = configureStore({
    reducer:{
        Auth:Auth.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})
export default store;
