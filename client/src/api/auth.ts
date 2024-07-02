import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, TShortUser} from "../models/user";
import {setLoadingAction, setErrorAction} from "../store/common/commonSlice"
import {setCredentialsAction, removeCredentialsAction, setAuthUserAction} from "../store/auth/authSlice"
import {AuthService} from "../services/AuthService";
import {objectToFormData} from "../utils/request";
import {RootState} from "../store/store";
import {IResponse} from "../models/response";
import {baseQuery} from "./errorHandling";

interface ILoginRequest {
    login: string
    password: string
}

interface IAuth {
    authUser: TShortUser | null
    token: string | null
}

interface ILoginResponse extends IResponse {
    user: TShortUser
    token: string
}

export interface IRegistrationRequest extends Pick<IUser, 'login' | 'email' | 'phone'>{
    password: string
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQuery('/auth'),
    tagTypes: ['authUser'],
    endpoints: (builder) => ({
        login: builder.mutation<IAuth, ILoginRequest>({
            query: (loginData) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: objectToFormData(loginData)
                }
            },
            transformResponse: (response: ILoginResponse) => {
                if (!response.result || !response.user) {
                    return {authUser: null, token: null};
                }

                response.user.id = +response.user.id

                return {
                    authUser: response.user,
                    token: response.token
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const {data, meta} = await queryFulfilled

                dispatch(setCredentialsAction({
                    authUser: data.authUser,
                    token: data.token
                }))
            }
        }),
        validate: builder.query<ILoginResponse, string>({
            query: (token) => {
                return {
                    url: '/validate',
                    method: 'POST',
                    body: objectToFormData({token}),
                }
            },
            transformResponse: (response: ILoginResponse) => {
                if (response.user) {
                    response.user.id = +response.user.id
                }

                return response
            },
            async onQueryStarted(token, {dispatch, queryFulfilled}) {
                const {data, meta} = await queryFulfilled

                if (!data.user) {
                    dispatch(removeCredentialsAction())
                    return;
                }

                dispatch(setCredentialsAction({
                    authUser: data.user,
                    token: token
                }))
            }
        }),
        changeUser: builder.mutation<ILoginResponse, Partial<IUser>>({
            query: (data) => {
                return {
                    url: '/change_user',
                    method: 'POST',
                    body: objectToFormData(data)
                }
            },
            async onQueryStarted(token, {dispatch, queryFulfilled}) {
                const {data, meta} = await queryFulfilled

                if (!meta?.response?.ok || !data || !data.result || !data.user) {
                    dispatch(removeCredentialsAction())
                    return;
                }

                dispatch(setAuthUserAction(data.user))
            }
        }),

        registration: builder.mutation<IResponse, IRegistrationRequest>({
            query: (data) => {
                return {
                    url: '/registration',
                    method: 'POST',
                    body: objectToFormData(data)
                }
            }
        })

    })
})