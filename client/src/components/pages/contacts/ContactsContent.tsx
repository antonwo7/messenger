import React, {useState} from 'react';
import ProfileContent from "../profile/ProfileContent";
import ContactsSidebar from "./ContactsSidebar";
import {ProfileContext} from "../Profile";
import {userAPI} from "../../../api/user";
import {commonAPI} from "../../../api/common";

const ContactsContent = () => {
    const {data: users} = userAPI.useGetUsersQuery({own: true})
    const [profileUserId, setProfileUserId] = useState<number>(users && users.length ? users[0].id : 0)
    const {data: user, isLoading, isError, isSuccess, refetch: refetchUser} = userAPI.useGetUserQuery(profileUserId)
    const {data: common} = commonAPI.useGetCommonQuery()

    const selectUserHandler = (userId: number) => {
        setProfileUserId(userId)
    }

    if (!user) return <></>;

    return (
        <ProfileContext.Provider value={{user, selectUser: selectUserHandler, common}}>
            <div className="tyn-content tyn-content-full-height tyn-chat has-aside-base">
                <ContactsSidebar />
                <ProfileContent />
            </div>
        </ProfileContext.Provider>
    )
}

export default ContactsContent;