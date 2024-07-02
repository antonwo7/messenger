import React, {ComponentType, FC, useContext, useEffect} from 'react';
import {BlockUserIcon, ReportIcon} from "../../../../../common/icons"
import {userAPI} from "../../../../../../api/user";
import {ChatContext} from "../../ChatProfile";
import {IUser} from "../../../../../../models/user";

interface IOptionManageProps {
    Icon: ComponentType
    title: string
    description: string
    onClick: () => void
}

const OptionManage: FC<IOptionManageProps> = ({Icon, title, description, onClick}) => {
    return (
        <li>
            <a href="#" className="tyn-file" onClick={onClick}>
                <div className="tyn-media-group">
                    <div className="tyn-media text-bg-light">
                        <Icon />
                    </div>
                    <div className="tyn-media-col">
                        <h6 className="name">{title}</h6>
                        <div className="meta">{description}</div>
                    </div>
                </div>
            </a>
        </li>
    )
}

const OptionsManage = () => {
    const [changeUserOption, {isSuccess, isLoading, isError}] = userAPI.useChangeUserOptionMutation()
    const chatContext = useContext(ChatContext)
    const profileUser = chatContext.profileUser as IUser

    const toggleBlockHandler = () => {
        const newBlockValue = profileUser.options?.blocked ? 0 : 1

        changeUserOption({
            user_id: profileUser.id,
            option: 'blocked',
            value: newBlockValue
        })
    }

    useEffect(() => {
        if (!isSuccess) return;
        chatContext.refetchUser()
    }, [isSuccess])

    return (
        <div className="tab-pane active">
            <ul className="tyn-media-list gap gap-3">
                <OptionManage
                    onClick={toggleBlockHandler}
                    Icon={BlockUserIcon}
                    title={profileUser.options?.blocked ? 'Blocked' : 'Block'}
                    description={profileUser.options?.blocked ? 'This contact is blocked' : 'The Contact will no longer be in your contact'}
                />
                {/*<OptionManage*/}
                {/*    Icon={ReportIcon}*/}
                {/*    title={'Report'}*/}
                {/*    description={'Give feedback on the conversation'}*/}
                {/*/>*/}
            </ul>
        </div>
    )
}


export default OptionsManage;