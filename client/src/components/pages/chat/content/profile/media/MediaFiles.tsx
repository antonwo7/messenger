import React, {FC} from 'react';
import {DocFileIcon} from "../../../../../common/icons"

interface IMediaFileProps {
    url: string
    title: string
    weight: string
}

const MediaFile: FC<IMediaFileProps> = ({url, title, weight}) => {
    return (
        <li>
            <a href={url} className="tyn-file">
                <div className="tyn-media-group">
                    <div className="tyn-media tyn-size-lg text-bg-light">
                        <DocFileIcon />
                    </div>
                    <div className="tyn-media-col">
                        <h6 className="name">{title}</h6>
                        <div className="meta">{weight}</div>
                    </div>
                </div>
            </a>
        </li>
    )
}

const MediaFiles = () => {
    return (
        <div className="tab-pane" id="chat-media-files">
            <ul className="tyn-media-list gap gap-3">
                <MediaFile
                    url={'#'}
                    title={'themeyn_logo.ai'}
                    weight={'2.08 MB'}
                />
                <MediaFile
                    url={'#'}
                    title={'themeyn_logo.ai'}
                    weight={'2.08 MB'}
                />
                <MediaFile
                    url={'#'}
                    title={'themeyn_logo.ai'}
                    weight={'2.08 MB'}
                />
                <MediaFile
                    url={'#'}
                    title={'themeyn_logo.ai'}
                    weight={'2.08 MB'}
                />
            </ul>
        </div>
    );
};

export default MediaFiles;