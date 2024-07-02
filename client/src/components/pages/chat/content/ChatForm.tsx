import React, {useEffect, useRef, useState} from 'react';
import {
    DropdownIcon,
    MicrophoneIcon,
    ImageIcon,
    SmileIcon,
    MicrophoneDarkIcon,
    SendDarkIcon
} from "../../../common/icons"
import {chatAPI} from "../../../../api/chat";
import {useAppSelector} from "../../../../store/hooks";
import {stripTags} from "../../../../utils/clean";

const ChatForm = () => {
    const [sendMessage, {}] = chatAPI.useSendMessageMutation()
    const [changeMessage, {}] = chatAPI.useChangeMessageMutation()
    const chatUser = useAppSelector(state => state.message.chat.user)
    const editingMessage = useAppSelector(state => state.message.editingMessage)
    const initialText = editingMessage ? editingMessage.text : ''

    const ref = useRef<HTMLDivElement>(null)

    const saveMessageHandler = () => {
        if (!chatUser) return;
        if (!ref?.current?.innerHTML) return;

        if (editingMessage) {
            changeMessage({
                id: editingMessage.id,
                text: ref.current.innerHTML
            })
        } else {
            sendMessage({
                text: ref.current.innerHTML,
                to_user_id: chatUser.id
            })
        }

        ref.current.innerHTML = ''
    }

    return (
        <div className="tyn-chat-form">
            <div className="tyn-chat-form-insert">
                <ul className="tyn-list-inline gap gap-3">
                    <li className="dropup">
                        <button className="btn btn-icon btn-light btn-md btn-pill" data-bs-toggle="dropdown" data-bs-offset="0,10">
                            <DropdownIcon />
                        </button>
                        <div className="dropdown-menu">
                            <ul className="tyn-list-links">
                                <li>
                                    <a href="#">
                                        <MicrophoneIcon />
                                        <span>Voice Message</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="d-none d-sm-block">
                        <button className="btn btn-icon btn-light btn-md btn-pill">
                            <ImageIcon />
                        </button>
                    </li>
                    <li className="d-none d-sm-block">
                        <button className="btn btn-icon btn-light btn-md btn-pill">
                            <SmileIcon />
                        </button>
                    </li>
                </ul>
            </div>
            <div className="tyn-chat-form-enter">
                <div
                    ref={ref}
                    className="tyn-chat-form-input"
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {initialText}
                </div>
                <ul className="tyn-list-inline me-n2 my-1">
                    <li>
                        <button className="btn btn-icon btn-white btn-md btn-pill">
                            <SendDarkIcon />
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-icon btn-white btn-md btn-pill" onClick={saveMessageHandler}>
                            <MicrophoneDarkIcon />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ChatForm;