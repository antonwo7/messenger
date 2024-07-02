import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice";
import commonReducer from "./common/commonSlice";
import messageReducer from "./message/messageSlice";
import {authAPI} from "../api/auth";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userAPI} from "../api/user";
import {chatAPI} from "../api/chat";
import {commonAPI} from "../api/common";
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,
        message: messageReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
        [commonAPI.reducerPath]: commonAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authAPI.middleware,
        userAPI.middleware,
        chatAPI.middleware,
        commonAPI.middleware
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)