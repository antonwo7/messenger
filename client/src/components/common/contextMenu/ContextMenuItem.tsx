import React, {ComponentType, FC} from 'react';

interface IContextMenuItemProps {
    Icon: ComponentType
    text: string
    link?: string
    modalCall?: boolean
    onClickHandler?: () => void
}

const ContextMenuItem: FC<IContextMenuItemProps> = ({onClickHandler, Icon, text, link, modalCall = false}) => {
    return (
        <li onClick={onClickHandler || (() => {})}>
            <a href={link || '#'} data-bs-toggle={modalCall ? 'modal' : ''}>
                <Icon />
                <span>{text}</span>
            </a>
        </li>
    )
}

export default ContextMenuItem;