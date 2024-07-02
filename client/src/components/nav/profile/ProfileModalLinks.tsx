import React, {MouseEventHandler} from 'react';
import {LoginLightIcon, ProfileLightIcon, SettingsLightIcon, UnlockLightIcon} from "../../common/icons";
import {Link} from "react-router-dom";
import {removeCredentialsAction} from "../../../store/auth/authSlice"
import {cleanChatAction} from "../../../store/message/messageSlice"
import {useAppDispatch} from "../../../store/hooks";
import {NavLink, useNavigate} from "react-router-dom";

const ProfileModalLinks = () => {
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(removeCredentialsAction())
        dispatch(cleanChatAction())
    }

    return (
        <ul className="tyn-list-links">
            <li>
                <Link to="/profile">
                    <ProfileLightIcon />
                    <span>Profile</span>
                </Link>
            </li>
            <li>
                <Link to="/settings">
                    <SettingsLightIcon />
                    <span>Settings</span>
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <UnlockLightIcon />
                    <span>Change Password</span>
                </Link>
            </li>
            <li className="dropdown-divider" />
            <li>
                <a onClick={logoutHandler} href="#">
                    <LoginLightIcon />
                    <span>Log Out</span>
                </a>
            </li>
        </ul>
    )
}

export default ProfileModalLinks;