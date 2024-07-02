import React, {FC} from 'react';

interface IMessageUserProps {
    name: string
    status: string
}

const MessageUser: FC<IMessageUserProps> = ({name, status}) => {
    return (
        <div className="tyn-media-row">
            <h6 className="name">{name}</h6>
            <span className="typing">{status}</span>
        </div>
    )
}

export default MessageUser