import React, {FC} from 'react';
import {endpoints} from "../../../../../../endpoints";
import PreloadedImage from "../../../../../common/PreloadedImage";

interface IItemAvatarProps {
    userId: number
}

const ItemAvatar: FC<IItemAvatarProps> = ({userId}) => {
    return (
        <div className="tyn-reply-avatar">
            <div className="tyn-media tyn-size-md tyn-circle">
                <PreloadedImage src={`${endpoints.usersGetAvatar}${userId}`} />
            </div>
        </div>
    );
};

export default ItemAvatar;