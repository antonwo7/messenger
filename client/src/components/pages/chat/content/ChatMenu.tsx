import React, {ElementRef, FC, RefObject, useState} from 'react';
import {
    PhoneDarkIcon,
    CameraDarkIcon,
    SidebarIcon,
    SearchIcon
} from "../../../common/icons"
import ChatProfile from "./ChatProfile";

interface IChatMenuProps {
    toggleProfile: () => void
    toggleSearch: () => void
}

const ChatMenu: FC<IChatMenuProps> = ({toggleProfile, toggleSearch}) => {

    return (
        <>
            <ul className="tyn-list-inline gap gap-3 ms-auto">
                <li>
                    <button className="btn btn-icon btn-light">
                        <PhoneDarkIcon />
                    </button>
                </li>
                <li>
                    <button className="btn btn-icon btn-light">
                        <CameraDarkIcon />
                    </button>
                </li>
                <li className="d-none d-sm-block">
                    <button className="btn btn-icon btn-light js-toggle-chat-search" onClick={toggleSearch}>
                        <SearchIcon />
                    </button>
                </li>
                <li>
                    <button className="btn btn-icon btn-light js-toggle-chat-options" onClick={toggleProfile}>
                        <SidebarIcon />
                    </button>
                </li>
            </ul>
        </>
    )
}

export default ChatMenu