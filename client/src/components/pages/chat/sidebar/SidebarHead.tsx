import React, {ComponentType, FC, useState} from 'react';
import classNames from "classnames";
import {
    ArchivedChatIcon,
    PlusIcon,
    FilterIcon,
    ChatsIcon,
    VerifiedUserIcon,
    TrashIcon
} from "../../../../components/common/icons"
import NewChatModal from "./head/NewChatModal";
import NewContactModal from "../../../common/NewContactModal";
import {TShortUser} from "../../../../models/user";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {createConversationAction} from "../../../../store/message/messageSlice"
import {chatAPI} from "../../../../api/chat";

interface ISidebarHeadLinkProps {
    Icon: ComponentType
    text: string
    active?: boolean
}

const SidebarHeadLink: FC<ISidebarHeadLinkProps> = ({Icon, text, active}) => {
    return (
        <li className="dropdown">
            <button className={classNames('nav-link', {'active': active})}>
                <Icon />
                <span>{text}</span>
            </button>
        </li>
    )
}


const SidebarHead = () => {
    const dispatch = useAppDispatch()
    const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false)
    const conversations = useAppSelector(state => state.message.conversations)
    const [getChat, {}] = chatAPI.useGetChatMutation()

    const conversationExists = (userId: number): boolean => {
        for (let conversation of conversations) {
            if (userId === conversation.user.id) {
                return true;
            }
        }

        return false;
    }

    const toggleNewChatModalHandler = () => {
        setShowNewChatModal(!showNewChatModal)
    }

    const closeNewChatModalHandler = () => {
        setShowNewChatModal(false)
    }

    const createChatHandler = (user: TShortUser) => {
        if (conversationExists(user.id)) {
            getChat(user.id)
            return;
        }

        dispatch(createConversationAction(user))
        closeNewChatModalHandler()
    }

    return (
        <>
            <div className="tyn-aside-head-tools">
                <ul className="link-group gap gx-3">
                    <li className="dropdown">
                        <button className="link" onClick={toggleNewChatModalHandler}>
                            <PlusIcon />
                            <span>New</span>
                        </button>
                    </li>
                    <li className="dropdown">
                        <button className="link dropdown-toggle">
                            <FilterIcon />
                            <span>Filter</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <ul className="tyn-list-links nav nav-tabs border-0">
                                <SidebarHeadLink Icon={ChatsIcon} text={'All Chats'} />
                                <SidebarHeadLink Icon={VerifiedUserIcon} text={'Active Contacts'} />
                                <SidebarHeadLink Icon={ArchivedChatIcon} text={'Archived Chats'} />
                                <SidebarHeadLink Icon={TrashIcon} text={'Trash Bin'} />
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            {showNewChatModal && <NewContactModal closeHandler={closeNewChatModalHandler} successHandler={createChatHandler} />}
        </>
    );
};

export default SidebarHead;