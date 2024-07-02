import React, {useEffect, useState} from 'react';
import Nav from "../Nav";
import ContactsSidebar from "./contacts/ContactsSidebar";
import ProfileContent from "./profile/ProfileContent";
import {ProfileContext} from "./Profile";
import {userAPI} from "../../api/user";
import {commonAPI} from "../../api/common";
import ContactsContent from "./contacts/ContactsContent";

const Contacts = () => {
    const {data: users, refetch: getUsers} = userAPI.useGetUsersQuery({own: true})

    return (
        <>
            <Nav />
            {users && <ContactsContent />}
        </>
    )
}

export default Contacts;