import React, {ComponentType, FC, useState} from 'react';
import {
    ArchivedChatIcon,
    ChatsIcon,
    FilterIcon,
    PlusIcon,
    SearchIcon,
    TrashIcon,
    VerifiedUserIcon
} from "../../common/icons";
import NewChatModal from "../chat/sidebar/head/NewChatModal";
import classNames from "classnames";
import NewContactModal from "../../common/NewContactModal";
import {TShortUser} from "../../../models/user";
import {createConversationAction} from "../../../store/message/messageSlice";
import {useAppDispatch} from "../../../store/hooks";
import PageTitle from "../common/PageTitle";
import SidebarContacts from "./sidebar/SidebarContacts";

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

const ContactsSidebar = () => {
    const dispatch = useAppDispatch()
    const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false)

    const toggleNewChatModalHandler = () => {
        setShowNewChatModal(!showNewChatModal)
    }

    const closeNewChatModalHandler = () => {
        setShowNewChatModal(false)
    }

    const addHandler = (user: TShortUser) => {
        dispatch(createConversationAction(user))
    }

    return (
        <>
            <div className="tyn-aside tyn-aside-base">
                <div className="tyn-aside-head">
                    <PageTitle title={'Contacts'} />
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
                                        <SidebarHeadLink Icon={ChatsIcon} text={'All contacts'} />
                                        <SidebarHeadLink Icon={TrashIcon} text={'Blocked'} />
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tyn-aside-body">
                    <div className="tab-content">
                        <div className="tab-pane show active">
                            <SidebarContacts />
                        </div>
                    </div>
                </div>
            </div>
            {showNewChatModal && <NewContactModal
                successHandler={addHandler}
                closeHandler={closeNewChatModalHandler}
            />}
        </>
    )
}

export default ContactsSidebar;