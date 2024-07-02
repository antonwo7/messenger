import {
    BellIcon,
    CameraIcon,
    CheckIcon,
    DownloadIcon,
    PhoneIcon,
    ProfileLightIcon,
    TrashIcon
} from "../../../../../common/icons";
import React, {FC, useState} from "react";
import ContextMenuItem from "../../../../../common/contextMenu/ContextMenuItem";
import ContextMenuDivider from "../../../../../common/contextMenu/ContextMenuDivider";
import {TShortUser} from "../../../../../../models/user";
import {userAPI} from "../../../../../../api/user";
import ProfileMuteModal from "../../../../chat/content/profile/ProfileMuteModal";

interface IContactMenuProps {
    user: TShortUser
}

const ContactMenu: FC<IContactMenuProps> = ({user}) => {
    const [showMuteModal, setShowMuteNodal] = useState<boolean>(false)
    const [deleteOwnerUser] = userAPI.useDeleteOwnerUserMutation()
    const [changeUserOption, {isLoading, isSuccess}] = userAPI.useChangeUserOptionMutation()
    const isMute = !!user.options?.mute
    const isBlocked = !!user.options?.blocked

    const deleteContactHandler = () => {
        deleteOwnerUser(user.id)
    }

    const changeUserOptionHandler = (option: string, value: string | number) => {
        changeUserOption({
            user_id: user.id,
            option: option,
            value: value
        })
    }

    const toggleMuteHandler = () => {
        if (!!user.options?.mute) {
            changeUserOptionHandler('mute', 0)
        } else {
            openMuteModalHandler()
        }
    }

    const toggleBlockHandler = () => {
        const value = !!user.options?.blocked ? 0 : 1
        changeUserOptionHandler('blocked', value)
    }

    const openMuteModalHandler = () => {
        setShowMuteNodal(true)
    }

    const closeMuteModalHandler = () => {
        setShowMuteNodal(false)
    }

    const successMuteModalHandler = (minutes: number) => {
        closeMuteModalHandler()
        changeUserOptionHandler('mute', minutes)
    }

    return (
        <>
            <ul className="tyn-list-links">
                <ContextMenuItem Icon={PhoneIcon} text={'Audio Call'} link={'#callingScreen'} modalCall={true} />
                <ContextMenuItem Icon={CameraIcon} text={'Video Call'} link={'#videoCallingScreen'} modalCall={true} />
                <ContextMenuDivider />
                <ContextMenuItem Icon={BellIcon} text={isMute ? 'Unmute' : 'Mute'} onClickHandler={toggleMuteHandler} />
                <ContextMenuItem Icon={ProfileLightIcon} text={isBlocked ? 'Unblock' : 'Block'} onClickHandler={toggleBlockHandler} />
                <ContextMenuDivider />
                <ContextMenuItem Icon={TrashIcon} text={'Delete'} onClickHandler={deleteContactHandler} />
            </ul>
            {showMuteModal && <ProfileMuteModal closeHandler={closeMuteModalHandler} successHandler={successMuteModalHandler} />}
        </>
    )
}

export default ContactMenu;