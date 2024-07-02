import React, {FC, useState} from 'react';
import {
    SearchIcon,
    CloseIcon, ArrowUpIcon, ArrowDownIcon
} from "../../../common/icons"
import {chatAPI} from "../../../../api/chat";
import {useAppSelector} from "../../../../store/hooks";

interface IChatSearchProps {
    toggleSearch: () => void
}

const ChatSearch: FC<IChatSearchProps> = ({toggleSearch}) => {
    const [getChat, {}] = chatAPI.useGetChatMutation()
    const chatUser = useAppSelector(state => state.message.chat.user)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const closeHandler = () => {
        toggleSearch()
        getChat(chatUser?.id || 0)
    }

    const changeQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)

        getChat({
            userId: chatUser?.id || 0,
            query: e.target.value
        })
    }

    return (
        <div className="tyn-chat-search active">
            <div className="flex-grow-1">
                <div className="form-group">
                    <div className="form-control-wrap form-control-plaintext-wrap">
                        <div className="form-control-icon start">
                            <SearchIcon />
                        </div>
                        <input type="text" className="form-control form-control-plaintext" value={searchQuery} placeholder="Search in this chat" onChange={changeQueryHandler} />
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center gap gap-3">
                <ul className="tyn-list-inline ">
                    <li>
                        <button className="btn btn-icon btn-sm btn-transparent">
                            <ArrowUpIcon />
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-icon btn-sm btn-transparent">
                            <ArrowDownIcon />
                        </button>
                    </li>
                </ul>
                <ul className="tyn-list-inline ">
                    <li>
                        <button className="btn btn-icon btn-md btn-light js-toggle-chat-search" onClick={closeHandler}>
                            <CloseIcon />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatSearch;