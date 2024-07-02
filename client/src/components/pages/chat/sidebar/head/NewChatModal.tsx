import React, {FC, useState} from 'react';
import {userAPI} from "../../../../../api/user";
import {
    CloseIcon,
    SearchIcon,
    TextMessageIcon,
    PhoneIcon,
    CameraIcon,
    DotsIcon,
    SmallDotsIcon
} from "../../../../common/icons";
import useStateCallback from "../../../../../hooks/useStateCallback";
import {endpoints} from "../../../../../endpoints";
import PreloadedImage from "../../../../common/PreloadedImage";
import {TShortUser} from "../../../../../models/user"
import {Dropdown, Modal} from "react-bootstrap";
import DropdownToggle from "../../../../common/dropdown/DropdownToggle";
import DropdownMenu from "../../../../common/dropdown/DropdownMenu";
import {createConversationAction} from "../../../../../store/message/messageSlice"
import {useAppDispatch} from "../../../../../store/hooks";

interface INewChatModalProps {
    closeHandler: () => void
}

const NewChatModal: FC<INewChatModalProps> = ({closeHandler}) => {
    // const dispatch = useAppDispatch()
    // const [searchQuery, setSearchQuery] = useStateCallback<string>('')
    // const {data: ownerUsers, isSuccess, isError, isLoading, refetch: getOwnerUsers} = userAPI.useGetOwnerUsersQuery(searchQuery)
    //
    // const changeQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchQuery(e.target.value || '', () => {
    //         if (searchQuery.length > 3) {
    //             getOwnerUsers()
    //         }
    //     })
    // }
    //
    // const createChatHandler = (user: TShortUser) => {
    //     dispatch(createConversationAction(user))
    //     closeHandler()
    // }

    return (
        <Modal show={true} dialogClassName="modal-dialog-centered modal-sm" contentClassName="border-0">
            {/*<Modal.Body className="p-4">*/}
            {/*    <h4 className="pb-2">Search by login</h4>*/}
            {/*    <div className="form-group">*/}
            {/*        <div className="form-control-wrap">*/}
            {/*            <div className="form-control-icon start">*/}
            {/*                <SearchIcon />*/}
            {/*            </div>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="form-control form-control-solid"*/}
            {/*                placeholder="Search contact"*/}
            {/*                value={searchQuery}*/}
            {/*                onChange={changeQueryHandler}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <ul className="tyn-media-list gap gap-3 pt-4">*/}
            {/*        {ownerUsers && ownerUsers.map((user: TShortUser) => (*/}
            {/*            <li key={user.id}>*/}
            {/*                <div className="tyn-media-group">*/}
            {/*                    <div className="tyn-media">*/}
            {/*                        <PreloadedImage src={`${endpoints.usersGetAvatar}${user.id}`} />*/}
            {/*                    </div>*/}
            {/*                    <div className="tyn-media-col">*/}
            {/*                        <div className="tyn-media-row">*/}
            {/*                            <h6 className="name">{`${user.name} ${user.surname}`}</h6>*/}
            {/*                        </div>*/}
            {/*                        <div className="tyn-media-row">*/}
            {/*                            <p className="content">{user.login}</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <ul className="tyn-media-option-list me-n1">*/}
            {/*                        <li className="dropdown">*/}
            {/*                            <Dropdown>*/}
            {/*                                <Dropdown.Toggle as={DropdownToggle}>*/}
            {/*                                    <button className="btn btn-icon btn-white btn-pill dropdown-toggle">*/}
            {/*                                        <DotsIcon />*/}
            {/*                                    </button>*/}
            {/*                                </Dropdown.Toggle>*/}
            {/*                                <Dropdown.Menu*/}
            {/*                                    as={DropdownMenu}*/}
            {/*                                    className="dropdown-menu-end"*/}
            {/*                                    popperConfig={{*/}
            {/*                                        modifiers: [*/}
            {/*                                            {*/}
            {/*                                                name: "offset",*/}
            {/*                                                options: {*/}
            {/*                                                    offset: [10, 10]*/}
            {/*                                                },*/}
            {/*                                            }*/}
            {/*                                        ],*/}
            {/*                                    }}*/}
            {/*                                >*/}
            {/*                                    <ul className="tyn-list-links">*/}
            {/*                                        <li>*/}
            {/*                                            <Dropdown.Item onClick={() => createChatHandler(user)}>*/}
            {/*                                                <TextMessageIcon />*/}
            {/*                                                <span>Start Texting</span>*/}
            {/*                                            </Dropdown.Item>*/}
            {/*                                        </li>*/}
            {/*                                        <li>*/}
            {/*                                            <Dropdown.Item>*/}
            {/*                                                <PhoneIcon />*/}
            {/*                                                <span>Audio Call</span>*/}
            {/*                                            </Dropdown.Item>*/}
            {/*                                        </li>*/}
            {/*                                        <li>*/}
            {/*                                            <Dropdown.Item>*/}
            {/*                                                <CameraIcon />*/}
            {/*                                                <span>Video Call</span>*/}
            {/*                                            </Dropdown.Item>*/}
            {/*                                        </li>*/}
            {/*                                    </ul>*/}
            {/*                                </Dropdown.Menu>*/}
            {/*                            </Dropdown>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    <button*/}
            {/*        className="btn btn-md btn-icon btn-pill btn-white shadow position-absolute top-0 end-0 mt-n3 me-n3"*/}
            {/*        onClick={closeHandler}*/}
            {/*    >*/}
            {/*        <CloseIcon />*/}
            {/*    </button>*/}
            {/*</Modal.Body>*/}
        </Modal>
    )
}

export default NewChatModal;