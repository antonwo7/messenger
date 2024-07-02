import React, {createContext, FC, useContext} from 'react';
import ProfileHead from "./profile/ProfileHead";
import ProfileMenu from "./profile/ProfileMenu";
import ProfileMedia from "./profile/ProfileMedia";
import ProfileOptions from "./profile/ProfileOptions";
import {IUser, TShortUser} from "../../../../models/user";
import {useAppSelector} from "../../../../store/hooks";
import {userAPI} from "../../../../api/user";

type TChatContext = {
    refetchUser: () => void
    profileUser: IUser | null
}

export const ChatContext = createContext<TChatContext>({
    refetchUser: () => {},
    profileUser: null
})

const ChatProfile = () => {
    const {user: chatUser} = useAppSelector(state => state.message.chat)
    const {data: profileUser, isLoading, isError, isSuccess, refetch: refetchUser} = userAPI.useGetUserQuery(chatUser ? chatUser.id : 0)

    if (!profileUser || !isSuccess || isLoading || isError) {
        return <></>;
    }

    return (
        <ChatContext.Provider value={{profileUser, refetchUser}}>
            <div className="tyn-chat-content-aside show-aside">
                <ProfileHead />
                <ProfileMenu />
            </div>
        </ChatContext.Provider>
    )
}

export default ChatProfile;