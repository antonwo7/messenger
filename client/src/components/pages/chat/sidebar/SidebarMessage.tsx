import React, {FC} from 'react';
import MessageUser from "./message/MessageUser";
import MessageAvatar from "./message/MessageAvatar";
import MessageContent from "./message/MessageContent";
import {DotsIcon} from "../../../common/icons"
import MessageMenu from "./message/MessageMenu";
import {IMessage} from "../../../../models/message";
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "../../../common/dropdown/DropdownToggle";
import DropdownMenu from "../../../common/dropdown/DropdownMenu";
import {useAppSelector} from "../../../../store/hooks";
import classNames from "classnames";

interface ISidebarMessageProps {
    conversation: IMessage
    onSelect: () => void
    activeConversationUserId: number
}

const SidebarMessage: FC<ISidebarMessageProps> = ({conversation, onSelect, activeConversationUserId}) => {
    return (
        <li
            className={classNames('tyn-aside-item js-toggle-main', {active: activeConversationUserId === +conversation.user.id})}
            onClick={onSelect}
        >
            <div className="tyn-media-group">
                <MessageAvatar userId={conversation.user.id} />
                <div className="tyn-media-col">
                    <MessageUser name={`${conversation.user.name} ${conversation.user.surname}`} status={'typing...'} />
                    {conversation.text && <MessageContent text={conversation.text} time={conversation.created_on} />}
                </div>
                <div className="tyn-media-option tyn-aside-item-option">
                    <ul className="tyn-media-option-list">
                        <li className="dropdown">
                            <Dropdown>
                                <Dropdown.Toggle as={DropdownToggle}>
                                    <button className="btn btn-icon btn-white btn-pill dropdown-toggle">
                                        <DotsIcon />
                                    </button>
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
                                    <MessageMenu />
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    );
};

export default SidebarMessage;