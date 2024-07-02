import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserLanguage, IUserNet, TShortUser} from "../models/user";
import {setErrorAction} from "../store/common/commonSlice"
import {objectToFormData} from "../utils/request";
import {RootState} from "../store/store";
import {IResponse} from "../models/response";
import {removeCredentialsAction, setAuthUserAction} from "../store/auth/authSlice";
import {baseQuery} from "./errorHandling";

interface IGetOwnerUsersResponse extends IResponse {
    users: TShortUser[]
}

interface IGetUserResponse extends IResponse {
    user: IUser
}

interface IChangeUserOptionRequest<T> {
    user_id: number,
    option: string
    value: T
}

interface IAddImageRequest {
    files: FileList
}

interface IGetUsersRequest {
    own?: boolean
    query?: string
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQuery('/users'),
    tagTypes: ['user', 'users'],
    endpoints: (builder) => ({
        getUser: builder.query<IUser | null, number | void>({
            query: (userId) => {
                return {
                    url: '/get_user',
                    method: 'POST',
                    body: objectToFormData(userId ? {user_id: userId} : {})
                }
            },
            transformResponse: (response: IGetUserResponse) => {
                if (!response.result || !response.user) {
                    return null;
                }

                return response.user
            },
            providesTags: ['user']
        }),
        getUsers: builder.query<TShortUser[], IGetUsersRequest>({
            query: (requestData) => {
                return {
                    url: '/get_users',
                    method: 'POST',
                    body:  objectToFormData({
                        own: requestData.own ? requestData.own : 0,
                        query: requestData.query || ''
                    })
                }
            },
            transformResponse: (response: IGetOwnerUsersResponse) => {
                if (!response.result || !response.users) {
                    return [];
                }

                return response.users
            },
            providesTags: ['users']
        }),
        addOwnerUser: builder.mutation<IResponse, number>({
            query: (userId) => {
                return {
                    url: '/add_owner_user',
                    method: 'POST',
                    body:  objectToFormData({user_id: userId})
                }
            },
            invalidatesTags: ['users']
        }),
        deleteOwnerUser: builder.mutation<IResponse, number>({
            query: (userId) => {
                return {
                    url: '/delete_owner_user',
                    method: 'POST',
                    body:  objectToFormData({user_id: userId})
                }
            },
            invalidatesTags: ['users']
        }),
        changeUserOption: builder.mutation<IResponse, IChangeUserOptionRequest<number | string>>({
            query: (data) => {
                return {
                    url: '/change_user_option',
                    method: 'POST',
                    body:  objectToFormData(data)
                }
            },
            invalidatesTags: ['users']
        }),

        changeUser: builder.mutation<IResponse, Partial<IUser>>({
            query: (data) => {
                return {
                    url: '/change_user',
                    method: 'POST',
                    body: objectToFormData(data)
                }
            },
            invalidatesTags: ['user']
        }),

        changeNet: builder.mutation<IResponse, Pick<IUserNet, 'id'> & Partial<IUserNet>>({
            query: (data) => {
                return {
                    url: '/change_user_net',
                    method: 'POST',
                    body: objectToFormData(data)
                }
            },
            invalidatesTags: ['user']
        }),
        addNet: builder.mutation<IResponse, Omit<IUserNet, 'id'>>({
            query: (data) => {
                return {
                    url: '/add_user_net',
                    method: 'POST',
                    body: objectToFormData(data)
                }
            },
            invalidatesTags: ['user']
        }),
        deleteNet: builder.mutation<IResponse, number>({
            query: (userNetId) => {
                return {
                    url: '/delete_user_net',
                    method: 'POST',
                    body: objectToFormData({user_net_id: userNetId})
                }
            },
            invalidatesTags: ['user']
        }),

        addLanguage: builder.mutation<IResponse, number>({
            query: (langId) => {
                return {
                    url: '/add_user_language',
                    method: 'POST',
                    body: objectToFormData({lang_id: langId})
                }
            },
            invalidatesTags: ['user']
        }),
        deleteLanguage: builder.mutation<IResponse, number>({
            query: (userLangId) => {
                return {
                    url: '/delete_user_language',
                    method: 'POST',
                    body: objectToFormData({user_lang_id: userLangId})
                }
            },
            invalidatesTags: ['user']
        }),

        deleteImage: builder.mutation<IResponse, number>({
            query: (imageId) => {
                return {
                    url: '/delete_user_image',
                    method: 'POST',
                    body: objectToFormData({image_id: imageId})
                }
            },
            invalidatesTags: ['user']
        }),
        addImage: builder.mutation<IResponse, FileList>({
            query: (files) => {
                return {
                    url: '/add_user_image',
                    method: 'POST',
                    body: objectToFormData({}, files)
                }
            },
            invalidatesTags: ['user']
        }),

        deleteVideo: builder.mutation<IResponse, number>({
            query: (videoId) => {
                return {
                    url: '/delete_user_video',
                    method: 'POST',
                    body: objectToFormData({video_id: videoId})
                }
            },
            invalidatesTags: ['user']
        }),
        addVideo: builder.mutation<IResponse, FileList>({
            query: (files) => {
                return {
                    url: '/add_user_video',
                    method: 'POST',
                    body: objectToFormData({}, files)
                }
            },
            invalidatesTags: ['user']
        }),
        loadBackground: builder.mutation<IResponse, FileList>({
            query: (files) => {
                return {
                    url: '/load_user_background',
                    method: 'POST',
                    body: objectToFormData({}, files)
                }
            },
            invalidatesTags: ['user']
        }),
        loadAvatar: builder.mutation<IResponse, FileList>({
            query: (files) => {
                return {
                    url: '/load_user_avatar',
                    method: 'POST',
                    body: objectToFormData({}, files)
                }
            },
            invalidatesTags: ['user']
        }),
    })
})