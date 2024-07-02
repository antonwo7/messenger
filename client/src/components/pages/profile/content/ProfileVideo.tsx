import React, {useContext, useMemo, useRef, useState} from 'react';
import {ProfileContext} from "../../Profile";
import {userAPI} from "../../../../api/user";
import {endpoints} from "../../../../endpoints";
import {AuthService} from "../../../../services/AuthService";
import {CloseIcon, PlayIcon, PlusIcon} from "../../../common/icons";
import PreloadedImage from "../../../common/PreloadedImage";
import Lightbox, {Slide} from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import {useAppSelector} from "../../../../store/hooks";
import {IUser, TShortUser} from "../../../../models/user";

const poster = 'https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/home/3.jpg'

const ProfileVideo = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const {user} = useContext(ProfileContext) as {user: IUser}
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [deleteVideo] = userAPI.useDeleteVideoMutation()
    const [addVideo, {isLoading, isError, isSuccess}] = userAPI.useAddVideoMutation()
    const fileRef = useRef<HTMLInputElement>(null)

    const toggleModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenModal(!openModal)
    }

    const deleteVideoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.dataset.videoid) return;
        deleteVideo(+e.currentTarget.dataset.videoid)
    }

    const addVideoHandler = () => {
        fileRef?.current && fileRef.current.click()
    }

    const changeVideoFile = () => {
        if (!fileRef?.current?.files) return;
        addVideo(fileRef.current.files)
    }

    const slides: Slide[] = useMemo(() => {
        if (user?.video) {
            const getVideoUrl = (id: number) => `${endpoints.galleryGetGalleryVideo}${user.id}/${id}/?token=${AuthService.getToken()}`

            return user.video.map((video) => ({
                type: 'video',
                width: 1280,
                height: 720,
                poster: poster,
                sources: [{ src: getVideoUrl(video.id), type: 'video/mp4' }],
                autoPlay: true
            }))
        }
        return[]

    }, [user?.video])

    const isAuthUserProfile = authUser.id === user.id

    return (
        <div className="tyn-profile-details">
            <div className="col-12">
                <div className="row g-3">
                    <div className="mb-2">
                        {isAuthUserProfile && <>
                            <button className="btn btn-light w-auto" onClick={addVideoHandler}>
                                <PlusIcon />
                            </button>
                            <input type="file" ref={fileRef} className="d-none" onChange={changeVideoFile} />
                        </>}
                    </div>
                    {user?.video && user.video.map(video => (
                        <div className="col-4 position-relative">
                            <a href="#" onClick={toggleModalHandler} className="glightbox tyn-video">
                                <img src={poster} className="tyn-image" alt="" />
                                <div className="tyn-video-icon">
                                    <PlayIcon />
                                </div>
                            </a>
                            {isAuthUserProfile && <button className="btn btn-light position-absolute top-0 end-0" data-videoid={video.id} onClick={deleteVideoHandler}>
                                <CloseIcon />
                            </button>}
                        </div>
                    ))}
                </div>
                <Lightbox
                    open={openModal}
                    close={() => setOpenModal(false)}
                    plugins={[Video]}
                    slides={slides}
                />
            </div>
        </div>
    )
}

export default ProfileVideo;