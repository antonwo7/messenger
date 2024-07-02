import React, { FC } from "react";
import MessageItem from "./messageList/MessageItem";
import {useAppSelector} from "../../../../store/hooks";
import {IMessage} from "../../../../models/message";

interface IMessagesDividerProps {
    date: Date
}

const MessagesDivider: FC<IMessagesDividerProps> = ({date}) => <div className="tyn-reply-separator">{date.toString()}</div>

const ChatMessageList = () => {
    const {messages} = useAppSelector(state => state.message.chat)
    return (
        <>
            {messages.map((message: IMessage) => (
                <MessageItem message={message} />
            ))}
            {/*<MessageItem*/}
            {/*    isIncoming={true}*/}
            {/*    date={(new Date()).toDateString()}*/}
            {/*    time={'13:34'}*/}
            {/*    title={'Incoming Audio Call'}*/}
            {/*    type={'video'}*/}
            {/*    isMissed={false}*/}
            {/*/>*/}
            {/*<MessagesDivider date={new Date()}/>*/}
            {/*<MessageItem*/}
            {/*    isIncoming={false}*/}
            {/*    date={(new Date()).toDateString()}*/}
            {/*    time={'13:34'}*/}
            {/*    title={'Missed Audio Call'}*/}
            {/*    type={'audio'}*/}
            {/*    isMissed={true}*/}
            {/*/>*/}
            {/*<MessageItem*/}
            {/*    isIncoming={false}*/}
            {/*    date={(new Date()).toDateString()}*/}
            {/*    time={'13:34'}*/}
            {/*    title={'Outgoing Audio Call'}*/}
            {/*    type={'audio'}*/}
            {/*    isMissed={false}*/}
            {/*/>*/}
        </>
    );
};

export default ChatMessageList