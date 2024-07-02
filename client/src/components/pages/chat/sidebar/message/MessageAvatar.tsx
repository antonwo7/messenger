import React, {FC} from 'react';
import {IUser} from "../../../../../models/user";
import {endpoints} from "../../../../../endpoints";
import PreloadedImage from "../../../../common/PreloadedImage";

interface IMessageAvatarProps {
    userId: number
}

const MessageAvatar: FC<IMessageAvatarProps> = ({userId}) => {
    return (
        <div className="tyn-media tyn-size-lg">
            <PreloadedImage src={`${endpoints.usersGetAvatar}${userId}`} />
        </div>
    )
}

export default MessageAvatar