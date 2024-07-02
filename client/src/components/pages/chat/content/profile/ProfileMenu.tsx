import React, {FC, useContext, useEffect, useState} from 'react';
import {
    BellDarkIcon,
    BellMutedDarkIcon,
    MediaIcon,
    OptionsIcon
} from "../../../../common/icons"
import {IUser} from "../../../../../models/user";
import {userAPI} from "../../../../../api/user";
import ProfileMuteModal from "./ProfileMuteModal";
import {ChatContext} from "../ChatProfile";
import {Tab, Tabs, TabContent, NavLink} from "react-bootstrap";
import MediaImages from "./media/MediaImages";
import ProfileMedia from "./ProfileMedia";
import ProfileOptions from "./ProfileOptions";

const ProfileMenu = () => {
    const chatContext = useContext(ChatContext)
    const [changeUserOption, {isLoading, isSuccess}] = userAPI.useChangeUserOptionMutation()
    const [showMuteModal, setShowMuteNodal] = useState<boolean>(false)
    const profileUser = chatContext.profileUser as IUser

    const toggleMuteHandler = () => {
        if (!!profileUser.options?.mute) {
            changeUserOption({
                user_id: profileUser.id,
                option: 'mute',
                value: 0
            })
        } else {
            openMuteModalHandler()
        }
    }

    const openMuteModalHandler = () => {
        setShowMuteNodal(true)
    }

    const closeMuteModalHandler = () => {
        setShowMuteNodal(false)
    }

    const successMuteModalHandler = (minutes: number) => {
        closeMuteModalHandler()
        changeUserOption({
            user_id: profileUser.id,
            option: 'mute',
            value: minutes
        })
    }

    useEffect(() => {
        if (!isSuccess) return;
        chatContext.refetchUser()
    }, [isSuccess])

    const muteItemHeaderContent = (
        <>
            {!!profileUser.options?.mute ? (
                <>
                    <span className="icon muted-icon">
                        <BellMutedDarkIcon />
                    </span>
                    <span className="muted-icon">Muted</span>
                </>
            ) : (
                <>
                    <span className="icon unmuted-icon">
                        <BellDarkIcon />
                    </span>
                    <span className="unmuted-icon">Mute</span>
                </>
            )}
        </>
    )
    const mediaItemHeaderContent = (
        <>
            <OptionsIcon />
            <span>Media</span>
        </>
    )
    const optionsItemHeaderContent = (
        <>
            <OptionsIcon />
            <span>Options</span>
        </>
    )

    return (
        <>
            <div className="tyn-aside-row">
                <Tabs defaultActiveKey="media" className="nav-btns nav-btns-stretch nav-btns-light border-0 no-padding" onSelect={(key, e) => {
                    if (key === 'mute') toggleMuteHandler()
                }}>
                    <Tab eventKey="mute" title={muteItemHeaderContent} className="js-chat-mute-toggle" />
                    <Tab eventKey="media" title={mediaItemHeaderContent}>
                        <ProfileMedia />
                    </Tab>
                    <Tab eventKey="options" title={optionsItemHeaderContent}>
                        <ProfileOptions />
                    </Tab>
                </Tabs>
            </div>
            {showMuteModal && <ProfileMuteModal closeHandler={closeMuteModalHandler} successHandler={successMuteModalHandler} />}
        </>
    );
};

export default ProfileMenu;