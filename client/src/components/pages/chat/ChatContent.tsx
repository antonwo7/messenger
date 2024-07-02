import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon} from "../../common/icons"
import ChatUser from './content/ChatUser';
import ChatSearch from './content/ChatSearch';
import ChatMenu from "./content/ChatMenu";
import ChatForm from "./content/ChatForm";
import ChatProfile from "./content/ChatProfile";
import ChatMessageList from "./content/ChatMessageList";
import {useAppSelector} from "../../../store/hooks";
import {chatAPI} from "../../../api/chat";
import classNames from "classnames";

const ChatContent = () => {
    const {user} = useAppSelector(state => state.message.chat)
    const [openProfile, setOpenProfile] = useState<boolean>(false)
    const [openSearch, setOpenSearch] = useState<boolean>(false)

    const toggleProfileHandler = () => {
        setOpenProfile(!openProfile)
    }

    const toggleSearchHandler = () => {
        setOpenSearch(!openSearch)
    }

    return (
        <div className={classNames('tyn-main tyn-chat-content', {'aside-shown': openProfile})}>
            <div className="tyn-chat-head">
                {user && (
                    <>
                        <ul className="tyn-list-inline d-md-none ms-n1">
                            <li>
                                <button className="btn btn-icon btn-md btn-pill btn-transparent js-toggle-main">
                                    <ArrowLeftIcon />
                                </button>
                            </li>
                        </ul>
                        <ChatUser user={user} />
                        <ChatMenu toggleProfile={toggleProfileHandler} toggleSearch={toggleSearchHandler} />
                        {openSearch && <ChatSearch toggleSearch={toggleSearchHandler} />}
                    </>
                )}
            </div>
            <div className="tyn-chat-body js-scroll-to-end">
                <div className="tyn-reply">
                    <ChatMessageList />
                </div>
            </div>
            <ChatForm />
            {openProfile && <ChatProfile />}
        </div>
    );
};

export default ChatContent;