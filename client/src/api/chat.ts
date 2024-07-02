import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, TShortUser} from "../models/user";
import {setErrorAction} from "../store/common/commonSlice"
import {objectToFormData} from "../utils/request";
import {RootState} from "../store/store";
import {IChat, IMessage} from "../models/message";
import {setConversationsAction, setChatAction} from "../store/message/messageSlice";
import {IResponse} from "../models/response";
import {MaybePromise} from "@reduxjs/toolkit/dist/query/tsHelpers";
import {baseQuery} from "./errorHandling";

interface IGetConversationsResponse extends IResponse {
    conversations: Array<IMessage>
    chat: {
        user: TShortUser
        messages: IMessage[]
    }
}

interface IGetChatResponse extends IResponse, IChat {}

interface ISendMessageRequest {
    text: string
    to_user_id: number
}

interface IChangeMessageRequest {
    text: string
    id: number
}

interface IGetChatRequest {
    userId: number
    query?: string
}

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    baseQuery: baseQuery('/messages'),
    tagTypes: ['chat'],
    endpoints: (builder) => ({
        getConversations: builder.query<IMessage[], void | string>({
            query: (query = '') => {
                return {
                    url: '/get_conversations',
                    method: 'POST',
                    body: objectToFormData({query})
                }
            },
            transformResponse: (response: IGetConversationsResponse) => {
                if (!response.result || !response.conversations) {
                    return [];
                }

                return response.conversations.map(conversation => {
                    return {
                        id: +conversation.id,
                        text: conversation.text,
                        created_on: conversation.created_on,
                        from_user_id: +conversation.from_user_id,
                        to_user_id: +conversation.to_user_id,
                        user: {
                            id: +conversation.user.id,
                            name: conversation.user.name,
                            surname: conversation.user.surname,
                            login: conversation.user.login
                        }
                    }
                })
            },
            async onQueryStarted(token, {dispatch, queryFulfilled}) {
                const {data: conversations, meta} = await queryFulfilled

                dispatch(setConversationsAction(conversations))
            },
            providesTags: ['chat']
        }),
        getChat: builder.mutation<IChat, IGetChatRequest | number>({
            query: (data) => {
                const requestData = typeof data === 'number'
                    ? {user_id: data}
                    : {user_id: data.userId, query: data.query || ''}

                console.log('getChat')

                return {
                    url: '/get_chat',
                    method: 'POST',
                    body: objectToFormData(requestData)
                }
            },
            transformResponse: (response: IGetChatResponse) => {
                if (!response.result || !response.messages || !response.user) {
                    return {user: null, messages: []};
                }

                response.messages = response.messages.map(message => {
                    return {...message, id: +message.id, from_user_id: message.from_user_id, to_user_id: message.to_user_id}
                })

                response.user.id = +response.user.id

                return response
            },
            async onQueryStarted(token, {dispatch, queryFulfilled}) {
                const {data, meta} = await queryFulfilled

                dispatch(setChatAction({user: data.user, messages: data.messages}))
            }
        }),

        sendMessage: builder.mutation<IResponse, ISendMessageRequest>({
            query: (message) => {
                return {
                    url: '/add_message',
                    method: 'POST',
                    body: objectToFormData(message)
                }
            },
            invalidatesTags: ['chat']
        }),

        deleteMessage: builder.mutation<IResponse, number>({
            query: (id) => {
                return {
                    url: '/delete_message',
                    method: 'POST',
                    body: objectToFormData({message_id: id})
                }
            },
            invalidatesTags: ['chat']
        }),

        changeMessage: builder.mutation<IResponse, IChangeMessageRequest>({
            query: (message) => {
                return {
                    url: '/change_message',
                    method: 'POST',
                    body: objectToFormData(message)
                }
            },
            invalidatesTags: ['chat']
        }),

    })
})