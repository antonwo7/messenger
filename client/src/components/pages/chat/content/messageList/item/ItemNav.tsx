import React, {FC, useRef, useState} from 'react';
import {
    VideoCallIcon,
    SmallDotsIcon,
    EditIcon,
    TrashIcon, DotsIcon
} from "../../../../../common/icons"
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "../../../../../common/dropdown/DropdownToggle";
import DropdownMenu from "../../../../../common/dropdown/DropdownMenu";
import MessageMenu from "../../../sidebar/message/MessageMenu";
import {chatAPI} from "../../../../../../api/chat";
import classNames from "classnames";
import {setEditingMessageAction} from "../../../../../../store/message/messageSlice"
import {IMessage} from "../../../../../../models/message";
import {useAppDispatch, useAppSelector} from "../../../../../../store/hooks";

interface IItemNav {
    message: IMessage
}

const ItemNav: FC<IItemNav> = ({message}) => {
    const [deleteMessage, {}] = chatAPI.useDeleteMessageMutation()
    const dispatch = useAppDispatch()
    const {authUser} = useAppSelector(state => state.auth)
    if (!authUser) return <></>

    const isIncomingMessage = +message.to_user_id === +authUser.id

    const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        deleteMessage(message.id)
    }

    const changeHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        dispatch(setEditingMessageAction({
            id: message.id,
            text: message.text
        }))
    }

    return (
        <ul className="tyn-reply-tools">
            <li>
                <button className="btn btn-icon btn-sm btn-transparent btn-pill">
                    <VideoCallIcon />
                </button>
            </li>
            <li className="dropup-center">
                <Dropdown>
                    <Dropdown.Toggle as={DropdownToggle}>
                        <button className="btn btn-icon btn-sm btn-transparent btn-pill">
                            <SmallDotsIcon />
                        </button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        as={DropdownMenu}
                        className="dropdown-menu-xxs"
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
                        <ul className="tyn-list-links">
                            {!isIncomingMessage && (
                                <li>
                                    <Dropdown.Item onClick={changeHandler}>
                                        <EditIcon />
                                        <span>Edit</span>
                                    </Dropdown.Item>
                                </li>
                            )}
                            <li>
                                <Dropdown.Item onClick={deleteHandler}>
                                    <TrashIcon />
                                    <span>Delete</span>
                                </Dropdown.Item>
                            </li>
                        </ul>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    );
};

export default ItemNav;