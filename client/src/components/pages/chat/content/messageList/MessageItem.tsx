import React, {FC} from 'react';
import classNames from "classnames";
import ItemAvatar from "./item/ItemAvatar";
import ItemNav from "./item/ItemNav";
import ItemIcon from "./item/ItemIcon";
import {IMessage} from "../../../../../models/message";
import {useAppSelector} from "../../../../../store/hooks";

interface IChatMessageListProps {
    message: IMessage
}

const MessageItem: FC<IChatMessageListProps> = ({message}) => {
    const {authUser} = useAppSelector(state => state.auth)

    if (!authUser) return <></>

    const isIncoming = +message.to_user_id === +authUser.id
    const date = message.created_on
    const time = message.created_on
    const title = ''
    const type = 'text'
    const isMissed = false
    const text = message.text
    const fromUserId = message.from_user_id

    return (
        <div className={classNames("tyn-reply-item", {incoming: isIncoming, outgoing: !isIncoming})}>
            {isIncoming && (
                <div className="tyn-reply-avatar">
                    <ItemAvatar userId={fromUserId} />
                </div>
            )}
            <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                    {type === 'text' ? (
                        <div className="tyn-reply-text">{text}</div>
                    ) : (
                        <div className="tyn-reply-call">
                            <a href="#" className="tyn-call">
                                <div className="tyn-media-group">
                                    <div className="tyn-media tyn-size-lg text-bg-light">
                                        <ItemIcon isIncoming={isIncoming} isMissed={isMissed} type={type} />
                                    </div>
                                    <div className="tyn-media-col">
                                        <h6 className="name">{title}</h6>
                                        <div className="meta">{time}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )}
                    <ItemNav message={message} />
                </div>
            </div>
        </div>
    );
};

export default MessageItem;