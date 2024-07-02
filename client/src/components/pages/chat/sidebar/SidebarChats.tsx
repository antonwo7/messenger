import React, {FC} from 'react';
import SidebarMessage from './SidebarMessage';
import {IMessage} from "../../../../models/message";
import {chatAPI} from "../../../../api/chat";
import {useAppSelector} from "../../../../store/hooks";

interface ISidebarChatsProps {
    conversations: IMessage[]
}

const SidebarChats: FC<ISidebarChatsProps> = ({conversations}) => {
    const [getChat, {}] = chatAPI.useGetChatMutation()
    const {user: chatUser} = useAppSelector(state => state.message.chat)

    const selectHandler = (userId: number) => {
        getChat(userId)
    }

    const activeConversationUserId = chatUser
        ? chatUser.id
        : conversations.length
            ? conversations[0].user.id
            : 0

    return (
        <ul className="tyn-aside-list">
            {conversations && conversations.map(conversation => (
                <SidebarMessage
                    conversation={conversation}
                    activeConversationUserId={activeConversationUserId}
                    onSelect={selectHandler.bind(null, conversation.user.id)}
                />
            ))}
        </ul>
    );
};

export default SidebarChats;