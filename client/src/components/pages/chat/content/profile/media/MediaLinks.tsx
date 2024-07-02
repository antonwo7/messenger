import React, {FC} from 'react';

interface IMediaLinkProps {
    img: string
    title: string
    url: string
}

const MediaLink: FC<IMediaLinkProps> = ({img, title, url}) => {
    return (
        <li>
            <a href="#" className="tyn-links">
                <div className="tyn-media-group">
                    <div className="tyn-media tyn-size-xl">
                        <img src={img} alt="" />
                    </div>
                    <div className="tyn-media-col">
                        <h6 className="name">{title}</h6>
                        <div className="anchor">{url}</div>
                    </div>
                </div>
            </a>
        </li>
    )
}

const MediaLinks = () => {
    return (
        <div className="tab-pane" id="chat-media-links">
            <ul className="tyn-media-list gap gap-3">
                <MediaLink
                    img={'../../../../../../assets/img/gallery/chat/thumb-7.jpg'}
                    title={'Digital Marketing Guide'}
                    url={'https://www.envato.com/blog/digital-marketing-guide/'}
                />
                <MediaLink
                    img={'../../../../../../assets/img/gallery/chat/thumb-7.jpg'}
                    title={'Digital Marketing Guide'}
                    url={'https://www.envato.com/blog/digital-marketing-guide/'}
                />
            </ul>
        </div>
    );
};

export default MediaLinks;