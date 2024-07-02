import React, {ComponentType, FC} from 'react';
import {
    TrashIcon,
    DownloadIcon,
    CameraIcon,
    PhoneIcon,
    ProfileLightIcon,
    BellIcon,
    CheckIcon
} from "../../../../common/icons"
import ContextMenuDivider from "../../../../common/contextMenu/ContextMenuDivider";
import ContextMenuItem from "../../../../common/contextMenu/ContextMenuItem";

const MessageMenu = () => {
    return (
        <ul className="tyn-list-links">
            <ContextMenuItem Icon={CheckIcon} text={'Mark as Read'} link={'#'} />
            <ContextMenuItem Icon={BellIcon} text={'Mute Notifications'} link={'#'} />
            <ContextMenuItem Icon={ProfileLightIcon} text={'View Profile'} link={'#'} />
            <ContextMenuDivider />
            <ContextMenuItem Icon={PhoneIcon} text={'Audio Call'} link={'#callingScreen'} modalCall={true} />
            <ContextMenuItem Icon={CameraIcon} text={'Video Call'} link={'#videoCallingScreen'} modalCall={true} />
            <ContextMenuDivider />
            <ContextMenuItem Icon={DownloadIcon} text={'Archive'} link={'#'} />
            <ContextMenuItem Icon={TrashIcon} text={'Delete'} link={'#deleteChat'} modalCall={true} />
        </ul>
    )
}

export default MessageMenu