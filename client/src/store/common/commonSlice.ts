import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface CommonState {
    isLoading: boolean
    error: string | null
}

const initialState: CommonState = {
    isLoading: false,
    error: null
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setErrorAction: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    }
})

export const {setLoadingAction, setErrorAction} = commonSlice.actions
export default commonSlice.reducer