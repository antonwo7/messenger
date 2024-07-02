import React, {FC} from 'react';
import {endpoints} from "../../../../endpoints";
import PreloadedImage from "../../../common/PreloadedImage";
import {IUser, TShortUser} from "../../../../models/user";

interface IChatUserProps {
    user: TShortUser
}

const ChatUser: FC<IChatUserProps> = ({user}) => {
    return (
        <div className="tyn-media-group">
            <div className="tyn-media tyn-size-lg d-none d-sm-inline-flex">
                <PreloadedImage src={`${endpoints.usersGetAvatar}${user.id}`} />
            </div>
            <div className="tyn-media tyn-size-rg d-sm-none">
                <PreloadedImage src={`${endpoints.usersGetAvatar}${user.id}`} />
            </div>
            <div className="tyn-media-col">
                <div className="tyn-media-row">
                    <h6 className="name">{user.name} <span className="d-none d-sm-inline-block">{user.surname}</span></h6>
                </div>
                <div className="tyn-media-row has-dot-sap">
                    <span className="meta">Active</span>
                </div>
            </div>
        </div>
    )
}

export default ChatUser;