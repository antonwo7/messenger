import React, {useContext, useMemo, useRef, useState} from 'react';
import PreloadedImage from "../../../common/PreloadedImage";
import {endpoints} from "../../../../endpoints";
import Lightbox from "yet-another-react-lightbox";
import {ProfileContext} from "../../Profile";
import {AuthService} from "../../../../services/AuthService";
import {IImage, IUser, TShortUser} from "../../../../models/user";
import {CloseIcon, PlusIcon} from "../../../common/icons";
import {userAPI} from "../../../../api/user";
import {objectToFormData} from "../../../../utils/request";
import {useAppSelector} from "../../../../store/hooks";

const ProfileImages = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const {user} = useContext(ProfileContext) as {user: IUser}
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [deleteImage] = userAPI.useDeleteImageMutation()
    const [addImage, {isLoading, isError, isSuccess}] = userAPI.useAddImageMutation()
    const fileRef = useRef<HTMLInputElement>(null)

    const toggleModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setOpenModal(!openModal)
    }

    const slides = useMemo(() => {
        if (user?.images) {
            return user.images.map((image: IImage) => ({src: `${endpoints.galleryGetGalleryImage}${user.id}/${image.id}/?token=${AuthService.getToken()}`}))
        }
    }, [user?.images])

    const deleteImageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.dataset.imageid) return;
        deleteImage(+e.currentTarget.dataset.imageid)
    }

    const addImageHandler = () => {
        fileRef?.current && fileRef.current.click()
    }

    const changeImageFile = () => {
        if (!fileRef?.current?.files) return;
        addImage(fileRef.current.files)
    }

    const isAuthUserProfile = authUser.id === user.id

    return (
        <div className="tyn-profile-details">
            <div className="col-12">
                <div className="row g-3">
                    <div className="mb-2">
                        {isAuthUserProfile && <>
                            <button className="btn btn-light w-auto" onClick={addImageHandler}>
                                <PlusIcon />
                            </button>
                            <input type="file" ref={fileRef} className="d-none" onChange={changeImageFile} />
                        </>}
                    </div>
                    {user?.images && user.images.map(image => (
                        <div className="col-4 position-relative">
                            <a onClick={toggleModalHandler} href="" className="glightbox tyn-thumb" data-gallery="media-photo">
                                <PreloadedImage src={`${endpoints.galleryGetGalleryImage}${user.id}/${image.id}`} />
                            </a>
                            {isAuthUserProfile && <button className="btn btn-light position-absolute top-0 end-0" data-imageid={image.id} onClick={deleteImageHandler}>
                                <CloseIcon />
                            </button>}
                        </div>
                    ))}
                </div>
                <Lightbox
                    open={openModal}
                    close={() => setOpenModal(false)}
                    slides={slides}
                />
            </div>
        </div>
    )
}

export default ProfileImages;