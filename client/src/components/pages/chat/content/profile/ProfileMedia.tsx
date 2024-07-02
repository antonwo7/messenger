import React, {FC, useContext} from 'react';
import MediaImages from "./media/MediaImages";
import MediaVideos from "./media/MediaVideos";
import MediaFiles from "./media/MediaFiles";
import MediaLinks from "./media/MediaLinks";
import {IUser} from "../../../../../models/user";
import {ChatContext} from "../ChatProfile";
import {Tabs, Tab} from "react-bootstrap";

const ProfileMedia = () => {

    return (
        <div className="mt-3">
            <Tabs defaultActiveKey="images">
                <Tab eventKey="images" title="Images">
                    <MediaImages />
                </Tab>
                <Tab eventKey="videos" title="Videos">
                    <MediaVideos />
                </Tab>
            </Tabs>
            {/*<ul className="nav nav-tabs nav-tabs-line">*/}
            {/*    <li className="nav-item">*/}
            {/*        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#chat-media-images" type="button"> Images</button>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item">*/}
            {/*        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-videos" type="button"> Videos</button>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item">*/}
            {/*        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-files" type="button"> Files</button>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item">*/}
            {/*        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#chat-media-links" type="button"> Links</button>*/}
            {/*    </li>*/}
            {/*</ul>*/}

            {/*<div className="tyn-aside-row">*/}
            {/*    <div className="tab-content">*/}
            {/*        <MediaImages />*/}
            {/*        <MediaVideos />*/}
            {/*        <MediaFiles />*/}
            {/*        <MediaLinks />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default ProfileMedia;