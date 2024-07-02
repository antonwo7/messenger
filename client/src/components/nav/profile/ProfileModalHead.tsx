import React, {useEffect, useState} from "react";
import {LoadingIcon, VerifiedIcon} from "../../common/icons";
import {userAPI} from "../../../api/user";
import {IUser, TShortUser} from "../../../models/user";
import useLoadImage from "../../../hooks/useLoadImage";
import PreloadedImage from "../../common/PreloadedImage";
import {endpoints} from "../../../endpoints";

const ProfileModalHead = ({authUser}: {authUser: TShortUser}) => {
    return (
        <div className="tyn-media-group">
            <div className="tyn-media tyn-size-lg">
                <PreloadedImage src={`${endpoints.usersGetAvatar}${authUser.id}`} />
            </div>
            <div className="tyn-media-col">
                <div className="tyn-media-row">
                    <h6 className="name">{`${authUser.name} ${authUser.surname}`}</h6>
                    <div className="indicator varified">
                        <VerifiedIcon />
                    </div>
                </div>
                {authUser.seen && (
                    <div className="tyn-media-row has-dot-sap">
                        <p className="content">{authUser.seen}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileModalHead;