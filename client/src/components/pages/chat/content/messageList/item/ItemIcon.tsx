import React, {FC} from 'react';
import {
    VideoCallIcon,
    MissedAudioCallIcon,
    IncomingAudioCallIcon,
    OutgoingAudioCallIcon
} from "./../../../../../common/icons"

interface IItemIconProps {
    type: 'audio' | 'video' | 'text'
    isMissed: boolean
    isIncoming: boolean
}

const ItemIcon: FC<IItemIconProps> = ({type, isMissed, isIncoming}) => {
    const getIcon = () => {
        if (type === 'text') return null;
        if (type === 'video') return VideoCallIcon;
        if (isMissed) return MissedAudioCallIcon;
        if (isIncoming) return IncomingAudioCallIcon;
        return OutgoingAudioCallIcon;
    }
    const Icon = getIcon()

    return (
        <>
            {Icon && <Icon />}
        </>
    );
};

export default ItemIcon;