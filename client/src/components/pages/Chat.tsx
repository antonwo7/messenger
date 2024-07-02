import React, {useEffect} from 'react';
import Sidebar from './chat/Sidebar';
import ChatContent from './chat/ChatContent';
import Nav from "../Nav";
import {chatAPI} from "../../api/chat";
import {useAppSelector} from "../../store/hooks";

const Chat = () => {
    const authUser = useAppSelector(state => state.auth.authUser)
    const authUserId = authUser?.id || 0
    const chatUser = useAppSelector(state => state.message.chat.user)
    const conversations = useAppSelector(state => state.message.conversations)

    const {data, isLoading, isSuccess, refetch: getConversations} = chatAPI.useGetConversationsQuery()
    const [getChat, {}] = chatAPI.useGetChatMutation()


    useEffect(() => {
        getConversations()
    }, [authUserId])

    useEffect(() => {
        if (isSuccess && conversations.length) {
            const withUserId = chatUser
                ? chatUser.id
                : conversations[0]
                    ? conversations[0].to_user_id === authUserId
                        ? conversations[0].from_user_id
                        : conversations[0].to_user_id
                    : 0

            if (withUserId) {
                getChat(withUserId)
            }
        }
    }, [conversations])

    return (
        <>
            <Nav />
            <div className="tyn-content tyn-content-full-height tyn-chat has-aside-base">
                <Sidebar />
                <ChatContent />
            </div>
        </>
    )
}

export default Chat;