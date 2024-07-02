import React, {FC} from 'react';
import {format, parse} from 'date-format-parse';

interface IMessageContentProps {
    text: string
    time: string
}

const MessageContent: FC<IMessageContentProps> = ({text, time}) => {
    return (
        <div className="tyn-media-row has-dot-sap">
            <p className="content">{text}</p>
            <span className="meta">{format(parse(time, 'YYYY-MM-DD HH:mm:ss'), 'DD-MM-YYYY HH:mm')}</span>
        </div>
    )
}

export default MessageContent