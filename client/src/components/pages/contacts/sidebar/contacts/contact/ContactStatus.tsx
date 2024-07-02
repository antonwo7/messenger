import React, {FC} from 'react';

interface IMessageContentProps {
    text: string
    time: string
}

const ContactStatus: FC<IMessageContentProps> = ({text, time}) => {
    return (
        <div className="tyn-media-row has-dot-sap">
            <p className="content">{text}</p>
            <span className="meta">{time}</span>
        </div>
    )
}

export default ContactStatus;