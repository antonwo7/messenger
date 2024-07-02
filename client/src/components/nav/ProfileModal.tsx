import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks";
import ProfileModalHead from "./profile/ProfileModalHead";
import ProfileModalMode from "./profile/ProfileModalMode";
import ProfileModalLinks from "./profile/ProfileModalLinks";

const ProfileModal = () => {
    const authUser = useAppSelector(state => state.auth.authUser)
    if (!authUser) return <></>

    return (
        <>
            <div className="dropdown-gap">
                <ProfileModalHead authUser={authUser} />
            </div>
            <div className="dropdown-gap">
                <ProfileModalMode mode={authUser.interface_mode || 0} />
            </div>
            <ProfileModalLinks />
        </>
    )
}

export default ProfileModal