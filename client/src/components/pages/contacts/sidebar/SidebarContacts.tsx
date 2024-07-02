import React from 'react';
import {userAPI} from "../../../../api/user";
import SidebarContact from "./contacts/SidebarContact";

const SidebarContacts = () => {
    const {data: users, refetch: getUsers} = userAPI.useGetUsersQuery({
        query: '',
        own: true
    })

    return (
        <ul className="tyn-aside-list">
            {users && users.map(user => (
                <SidebarContact user={user} />
            ))}
        </ul>
    )
}

export default SidebarContacts;