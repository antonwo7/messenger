import React, {useContext} from 'react';
import {endpoints} from "../../../../../endpoints";
import PreloadedImage from "../../../../common/PreloadedImage";
import {ChatContext} from "../ChatProfile";
import {IUser} from "../../../../../models/user";

const ProfileHead = () => {
    const chatContext = useContext(ChatContext)
    const profileUser = chatContext.profileUser as IUser

    return (
        <>
            <div className="tyn-chat-cover">
                <PreloadedImage src={`${endpoints.usersGetBackground}${profileUser.id}`} />
            </div>
            <div className="tyn-media-group tyn-media-vr tyn-media-center mt-n4">
                <div className="tyn-media tyn-size-xl border border-2 border-white">
                    <PreloadedImage src={`${endpoints.usersGetAvatar}${profileUser.id}`} />
                </div>
                <div className="tyn-media-col">
                    <div className="tyn-media-row">
                        <h6 className="name">{`${profileUser.name} ${profileUser.surname}`}</h6>
                    </div>
                    <div className="tyn-media-row has-dot-sap">
                        <span className="meta">{profileUser.seen}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHead;