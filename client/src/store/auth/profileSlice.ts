import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IUser, TShortUser} from "../../models/user";
import {AuthService} from "../../services/AuthService";

export interface AuthState {
    user: IUser | null
}

const initialState: AuthState = {
    user: null
}

interface ILoginResponse {
    authUser: TShortUser | null
    token: string | null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileAction: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
})

export const {setProfileAction} = profileSlice.actions
export default profileSlice.reducer