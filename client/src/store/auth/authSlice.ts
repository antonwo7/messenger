import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IUser, TShortUser} from "../../models/user";
import {AuthService} from "../../services/AuthService";

export interface AuthState {
    authUser: TShortUser | null
    token: string | null
}

const initialState: AuthState = {
    authUser: null,
    token: null
}

interface ILoginResponse {
    authUser: TShortUser | null
    token: string | null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentialsAction: (state, action: PayloadAction<ILoginResponse>) => {
            state.authUser = action.payload.authUser
            state.token = action.payload.token
            action.payload.token && AuthService.saveToken(action.payload.token)
            document.body.dataset['bsTheme'] = !!action.payload.authUser?.interface_mode ? 'dark' : 'light'
        },
        setAuthUserAction: (state, action: PayloadAction<TShortUser>) => {
            state.authUser = action.payload
        },
        removeCredentialsAction: (state) => {
            state.authUser = null
            AuthService.removeToken()
        },
    }
})

export const {setCredentialsAction, removeCredentialsAction, setAuthUserAction} = authSlice.actions
export default authSlice.reducer