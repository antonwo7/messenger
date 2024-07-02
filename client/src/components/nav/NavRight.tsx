import React, {FC, useEffect, useRef, useState} from 'react';
import { Dropdown  } from 'react-bootstrap'

import {
    LinksIcon,
    NotificationIcon
} from "../../components/common/icons"
import ProfileModal from './ProfileModal';
import {Popover} from "bootstrap";
import DropdownToggle from "../common/dropdown/DropdownToggle";
import DropdownMenu from "../common/dropdown/DropdownMenu";
import PreloadedImage from "../common/PreloadedImage";
import {useAppSelector} from "../../store/hooks";
import {endpoints} from "../../endpoints";

interface INavRightState {
    menuModal: boolean
    notificationsModal: boolean
    profileModal: boolean

}

const NavRight: FC = () => {
    const authUser = useAppSelector(state => state.auth.authUser)
    if (!authUser) return <></>

    return (
        <ul className="tyn-appbar-nav tyn-appbar-nav-end">
            <li className="tyn-appbar-item dropdown">
                <a className="tyn-appbar-link dropdown-toggle" href="#">
                    <LinksIcon />
                    <span className="d-none">Menu</span>
                </a>
            </li>
            <li className="tyn-appbar-item">
                <a className="tyn-appbar-link dropdown-toggle" data-bs-toggle="dropdown" href="#" data-bs-offset="0,10" data-bs-auto-close="outside">
                    <NotificationIcon />
                    <span className="d-none">Notifications</span>
                </a>
            </li>
            <li className="tyn-appbar-item">
                <Dropdown>
                    <Dropdown.Toggle as={DropdownToggle}>
                        <div className="tyn-media tyn-size-lg tyn-circle">
                            <PreloadedImage src={`${endpoints.usersGetAvatar}${authUser.id}`} />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        as={DropdownMenu}
                        popperConfig={{
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [10, 10]
                                    },
                                }
                            ],
                        }}
                    >
                        <ProfileModal />
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    )
}

export default NavRight