import React, {FC, useEffect, useState} from 'react';
import {userAPI} from "../../api/user";
import {
    CloseIcon,
    SearchIcon,
    TextMessageIcon,
    PhoneIcon,
    CameraIcon,
    DotsIcon,
    SmallDotsIcon, BellIcon, BlockUserIcon, ProfileIcon
} from "../common/icons";
import useStateCallback from "../../hooks/useStateCallback";
import {endpoints} from "../../endpoints";
import PreloadedImage from "./PreloadedImage";
import {TShortUser} from "../../models/user"
import {Dropdown, Modal} from "react-bootstrap";
import DropdownToggle from "./dropdown/DropdownToggle";
import DropdownMenu from "./dropdown/DropdownMenu";
import {createConversationAction} from "../../store/message/messageSlice"
import {useAppDispatch} from "../../store/hooks";
import {chatAPI} from "../../api/chat";

interface INewContactModalProps {
    closeHandler: () => void
    own?: boolean
    successHandler: (user: TShortUser) => void
}

const NewContactModal: FC<INewContactModalProps> = ({closeHandler, successHandler, own}) => {
    const dispatch = useAppDispatch()
    const [changeUserOption, {isLoading: isUserOptionChanging, isSuccess: isUserOptionChanged}] = userAPI.useChangeUserOptionMutation()
    const [addOwnerUser] = userAPI.useAddOwnerUserMutation()
    const [searchQuery, setSearchQuery] = useStateCallback<string>('')
    const {data: users, refetch: getUsers} = userAPI.useGetUsersQuery({
        query: searchQuery,
        own: !!own
    })

    const changeQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value || '', () => {
            if (searchQuery.length > 3) {
                getUsers()
            }
        })
    }

    const addContactHandler = (user: TShortUser) => {
        successHandler(user)
        closeHandler()
    }

    const unmuteHandler = (user: TShortUser) => {
        changeUserOption({
            user_id: user.id,
            option: 'mute',
            value: 0
        })
    }

    const unblockHandler = (user: TShortUser) => {
        changeUserOption({
            user_id: user.id,
            option: 'blocked',
            value: 0
        })
    }

    const AddToContactsHandler = (userId: number) => {
        addOwnerUser(userId)
    }

    useEffect(() => {
        if (isUserOptionChanged) {
            getUsers()
        }
    }, [isUserOptionChanged])

    return (
        <Modal show={true} dialogClassName="modal-dialog-centered modal-sm" contentClassName="border-0">
            <Modal.Body className="p-4">
                <h4 className="pb-2">Search by login</h4>
                <div className="form-group">
                    <div className="form-control-wrap">
                        <div className="form-control-icon start">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-solid"
                            placeholder="Search contact"
                            value={searchQuery}
                            onChange={changeQueryHandler}
                        />
                    </div>
                </div>
                <ul className="tyn-media-list gap gap-3 pt-4">
                    {users && users.map((user: TShortUser) => (
                        <li key={user.id}>
                            <div className="tyn-media-group">
                                <div className="tyn-media">
                                    <PreloadedImage src={`${endpoints.usersGetAvatar}${user.id}`} />
                                </div>
                                <div className="tyn-media-col">
                                    <div className="tyn-media-row">
                                        <h6 className="name">{`${user.name} ${user.surname}`}</h6>
                                    </div>
                                    <div className="tyn-media-row">
                                        <p className="content">{user.login}</p>
                                    </div>
                                </div>
                                <ul className="tyn-media-option-list me-n1">
                                    <li className="dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle as={DropdownToggle}>
                                                <button className="btn btn-icon btn-white btn-pill dropdown-toggle">
                                                    <DotsIcon />
                                                </button>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                as={DropdownMenu}
                                                className="dropdown-menu-end"
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
                                                    {own && !user.options?.mute && !user.options?.blocked && (
                                                        <li>
                                                            <Dropdown.Item onClick={() => addContactHandler(user)}>
                                                                <TextMessageIcon />
                                                                <span>Start Texting</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                    {own && !!user.options?.mute && (
                                                        <li>
                                                            <Dropdown.Item onClick={() => unmuteHandler(user)}>
                                                                <BellIcon />
                                                                <span>Unmute</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                    {own && !!user.options?.blocked && (
                                                        <li>
                                                            <Dropdown.Item onClick={() => unblockHandler(user)}>
                                                                <BlockUserIcon />
                                                                <span>Unblock</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                    {own && (
                                                        <li>
                                                            <Dropdown.Item>
                                                                <PhoneIcon />
                                                                <span>Audio Call</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                    {own && (
                                                        <li>
                                                            <Dropdown.Item>
                                                                <CameraIcon />
                                                                <span>Video Call</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                    {!own && (
                                                        <li>
                                                            <Dropdown.Item onClick={() => AddToContactsHandler(user.id)}>
                                                                <ProfileIcon />
                                                                <span>Add to contacts</span>
                                                            </Dropdown.Item>
                                                        </li>
                                                    )}
                                                </ul>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="btn btn-md btn-icon btn-pill btn-white shadow position-absolute top-0 end-0 mt-n3 me-n3"
                    onClick={closeHandler}
                >
                    <CloseIcon />
                </button>
            </Modal.Body>
        </Modal>
    )
}



export default NewContactModal;