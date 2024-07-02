import React, {FC} from 'react';

interface IPageTitleProps {
    title: string
}

const PageTitle: FC<IPageTitleProps> = ({title}) => {
    return (
        <div className="tyn-aside-head-text">
            <h3 className="tyn-aside-title">{title}</h3>
        </div>
    )
}

export default PageTitle