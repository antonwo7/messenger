import React, {useContext, useEffect, useRef, useState} from 'react';
import {IUser, TShortUser} from "../../../models/user";
import {ProfileContext} from "../Profile";
import {endpoints} from "../../../endpoints";
import PreloadedImage from "../../common/PreloadedImage";
import {EditIcon} from "../../common/icons";
import {userAPI} from "../../../api/user";
import {useAppSelector} from "../../../store/hooks";

const ProfileHead = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const [loadBackground, {isLoading: isBackgroundLoading, isSuccess: isBackgroundSuccess}] = userAPI.useLoadBackgroundMutation()
    const [loadAvatar, {isLoading: isAvatarLoading, isSuccess: isAvatarSuccess}] = userAPI.useLoadAvatarMutation()
    const backgroundInputRef = useRef<HTMLInputElement>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const profileContext = useContext(ProfileContext)
    const user = profileContext.user as IUser
    const userContactsCount = user.contacts?.length || 0
    const [backTrigger, setBackTrigger] = useState('')
    const [avatarTrigger, setAvatarTrigger] = useState('')
    const [avatarEditEnabled, setAvatarEditEnabled] = useState(false)

    const generateTrigger = () => {
        return new Date().getTime().toString()
    }

    const changeBackgroundHandler = () => {
        if (!backgroundInputRef.current) return;
        backgroundInputRef.current.click()
    }

    const chooseBackgroundHandler = () => {
        if (!backgroundInputRef.current?.files) return;
        loadBackground(backgroundInputRef.current.files)
    }

    useEffect(() => {
        if (!isBackgroundLoading && isBackgroundSuccess) {
            setBackTrigger(generateTrigger())
        }
    }, [isBackgroundLoading, isBackgroundSuccess])

    const changeAvatarHandler = () => {
        if (!avatarInputRef.current) return;
        avatarInputRef.current.click()
    }

    const chooseAvatarHandler = () => {
        if (!avatarInputRef.current?.files) return;
        loadAvatar(avatarInputRef.current.files)
    }

    useEffect(() => {
        if (!isAvatarLoading && isAvatarSuccess) {
            setAvatarTrigger(generateTrigger())
        }
    }, [isAvatarLoading, isAvatarSuccess])

    const toggleAvatarEditEnabled = () => setAvatarEditEnabled(!avatarEditEnabled)

    const isAuthUserProfile = authUser.id === user.id

    return (
        <div className="tyn-profile-head">
            <div className="tyn-profile-cover position-relative">
                {isAuthUserProfile && (
                    <>
                        <button className="btn position-absolute top-0 bg-light m-2" onClick={changeBackgroundHandler}>
                            <EditIcon />
                        </button>
                        <input type="file" ref={backgroundInputRef} className="d-none" onChange={chooseBackgroundHandler}/>
                    </>
                )}
                <PreloadedImage src={`${endpoints.usersGetBackground}${user.id}`} hash={backTrigger} />
            </div>
            <div className="tyn-profile-info">
                <div className="tyn-media-group align-items-start">
                    <div onMouseEnter={toggleAvatarEditEnabled} onMouseLeave={toggleAvatarEditEnabled} className="tyn-media tyn-media-bordered tyn-size-4xl tyn-profile-avatar position-relative">
                        <PreloadedImage src={`${endpoints.usersGetAvatar}${user.id}`} hash={avatarTrigger} />
                        {isAuthUserProfile && avatarEditEnabled && (
                            <>
                                <button className="btn position-absolute top-0 bg-light m-2" onClick={changeAvatarHandler}>
                                    <EditIcon />
                                </button>
                                <input type="file" ref={avatarInputRef} className="d-none" onChange={chooseAvatarHandler}/>
                            </>
                        )}
                    </div>
                    <div className="tyn-media-col">
                        <div className="tyn-media-row">
                            <h4 className="name">{`${user.name} ${user.surname}`} <span className="username">{`@${user.login}`}</span></h4>
                        </div>
                        <div className="tyn-media-row has-dot-sap">
                            <span className="content">{`${userContactsCount} Contacts`}</span>
                        </div>
                        <div className="tyn-media-row pt-2">
                            <div className="tyn-media-multiple">
                                {user.contacts && user.contacts.map(contact => (
                                    <div className="tyn-media tyn-circle tyn-size-md tyn-media-bordered">
                                        <PreloadedImage src={`${endpoints.usersGetAvatar}${contact.id}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead;