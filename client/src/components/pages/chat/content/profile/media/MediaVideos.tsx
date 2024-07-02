import React, {FC, useContext, useState} from 'react';
import {PlayIcon} from "../../../../../common/icons"
import "yet-another-react-lightbox/styles.css";
import {AuthService} from "../../../../../../services/AuthService";
import {ChatContext} from "../../ChatProfile";
import {IUser} from "../../../../../../models/user";
import {endpoints} from "../../../../../../endpoints";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

const poster = 'https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/home/3.jpg'

const MediaVideos = () => {
    const chatContext = useContext(ChatContext)
    const profileUser = chatContext.profileUser as IUser
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenModal(!openModal)
    }

    const getVideoUrl = (id: number) => `${endpoints.galleryGetGalleryVideo}${profileUser.id}/${id}/?token=${AuthService.getToken()}`

    const slides: any = profileUser.video ? profileUser.video.map(video => ({
        type: 'video',
        width: 1280,
        height: 720,
        poster: poster,
        sources: [{ src: getVideoUrl(video.id), type: 'video/mp4' }],
        autoPlay: true

    })) : []

    return (
        <>
            <div className="row g-3 mt-3">
                {profileUser.video && profileUser.video.map(video => (
                    <div className="col-6">
                        <a href="#" onClick={toggleModalHandler} className="glightbox tyn-video">
                            <img src={poster} className="tyn-image" alt="" />
                            <div className="tyn-video-icon">
                                <PlayIcon />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <Lightbox
                open={openModal}
                close={() => setOpenModal(false)}
                plugins={[Video]}
                slides={slides}
            />
        </>
    )
}

export default MediaVideos;