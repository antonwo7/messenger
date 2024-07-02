import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IChat, IMessage} from "../../models/message";
import {TShortUser} from "../../models/user";

interface IEditingMessage extends Pick<IMessage, 'text' | 'id'> {}

export interface MessageState {
    conversations: IMessage[]
    chat: IChat
    editingMessage?: IEditingMessage | null
}

const initialState: MessageState = {
    conversations: [],
    chat: {
        user: null,
        messages: []
    },
    editingMessage: null
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setConversationsAction: (state, action: PayloadAction<IMessage[]>) => {
            state.conversations = action.payload
        },
        setChatAction: (state, action: PayloadAction<IChat>) => {
            state.chat = {
                user: action.payload.user,
                messages: action.payload.messages
            }
        },
        setEditingMessageAction: (state, action: PayloadAction<IEditingMessage>) => {
            state.editingMessage = action.payload
        },
        cleanChatAction: (state, action: PayloadAction<void>) => {
            state = initialState
        },
        createConversationAction: (state, action: PayloadAction<TShortUser>) => {
            const newConversation = {
                id: 0,
                text: '',
                from_user_id: 0,
                to_user_id: action.payload.id,
                created_on: '',
                user: action.payload
            }
            state.conversations = [newConversation, ...state.conversations]
            state.chat = {
                user: action.payload,
                messages: []
            }
        }
    }
})

export const {setConversationsAction, setChatAction, setEditingMessageAction, cleanChatAction, createConversationAction} = messageSlice.actions
export default messageSlice.reducer