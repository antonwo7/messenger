import React, {FC, useContext} from 'react';
import {IUser, TShortUser} from "../../../../../models/user";
import MessageAvatar from "../../../chat/sidebar/message/MessageAvatar";
import MessageUser from "../../../chat/sidebar/message/MessageUser";
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "../../../../common/dropdown/DropdownToggle";
import {DotsIcon} from "../../../../common/icons";
import DropdownMenu from "../../../../common/dropdown/DropdownMenu";
import MessageMenu from "../../../chat/sidebar/message/MessageMenu";
import ContactMenu from "./contact/ContactMenu";
import classNames from "classnames";
import MessageContent from "../../../chat/sidebar/message/MessageContent";
import {userAPI} from "../../../../../api/user";
import {ProfileContext} from "../../../Profile";

interface ISidebarContactProps {
    user: TShortUser
}

const SidebarContact: FC<ISidebarContactProps> = ({user}) => {
    const profileContext = useContext(ProfileContext)

    const onClickHandler = () => {
        if (profileContext.selectUser) {
            profileContext.selectUser(user.id)
        }
    }

    const profileUser = profileContext.user as IUser
    const isActive = +profileUser.id === user.id

    return (
        <li
            className={classNames('tyn-aside-item js-toggle-main', {active: isActive})}
            onClick={onClickHandler}
        >
            <div className="tyn-media-group">
                <MessageAvatar userId={user.id} />
                <div className="tyn-media-col">
                    <MessageUser name={`${user.name} ${user.surname}`} status={'typing...'} />
                    <div className="tyn-media-row has-dot-sap">
                        <p className="content">{`@${user.login}`}</p>
                        <span className="meta">{user.seen}</span>
                    </div>
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
                                    <ContactMenu user={user}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default SidebarContact;