import React from 'react';
import {
    MessageIcon,
    ProfileIcon
} from "../../components/common/icons"
import {NavLink} from "react-router-dom";

const NavLeft = () => {
    return (
        <ul className="tyn-appbar-nav tyn-appbar-nav-start">
            <li className="tyn-appbar-item">
                <NavLink to="/" className="tyn-appbar-link">
                    <MessageIcon />
                    <span className="d-none">Chats</span>
                </NavLink>
            </li>
            <li className="tyn-appbar-item">
                <NavLink to="/contacts" className="tyn-appbar-link">
                    <ProfileIcon />
                    <span className="d-none">Contacts</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default NavLeft