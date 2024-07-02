import React, {FC, useContext, useState} from 'react';
import {ChatContext} from "../../ChatProfile";
import {IUser} from "../../../../../../models/user";
import {endpoints} from "../../../../../../endpoints";
import PreloadedImage from "../../../../../common/PreloadedImage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {AuthService} from "../../../../../../services/AuthService";

const MediaImages = () => {
    const chatContext = useContext(ChatContext)
    const profileUser = chatContext.profileUser as IUser
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenModal(!openModal)
    }

    const slides = profileUser.images && profileUser.images.map(image => ({src: `${endpoints.galleryGetGalleryImage}${profileUser.id}/${image.id}/?token=${AuthService.getToken()}`}))

    return (
        <>
            <div className="row g-3 mt-3">
                {profileUser.images && profileUser.images.map(image => (
                    <div className="col-4">
                        <a onClick={toggleModalHandler} href="" className="glightbox tyn-thumb" data-gallery="media-photo">
                            <PreloadedImage src={`${endpoints.galleryGetGalleryImage}${profileUser.id}/${image.id}`} />
                        </a>
                    </div>
                ))}
            </div>
            <Lightbox
                open={openModal}
                close={() => setOpenModal(false)}
                slides={slides}
            />
        </>
    );
};

export default MediaImages;