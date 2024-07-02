import React, {useContext, useEffect, useState} from 'react';
import {useAppSelector} from "../../../../../store/hooks";
import {ProfileContext} from "../../../Profile";
import {IUser, TShortUser} from "../../../../../models/user";
import {endpoints} from "../../../../../endpoints";
import PreloadedImage from "../../../../common/PreloadedImage";
import {userAPI} from "../../../../../api/user";

const InformationForm = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const context = useContext(ProfileContext)
    const user = context.user as IUser
    const [userInfo, setUserInfo] = useState(user)
    const [changeUser, {isLoading, isSuccess}] = userAPI.useChangeUserMutation()

    const changeUserHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name in userInfo) {
            setUserInfo({...userInfo, [e.target.name]: e.target.value})
        }
    }

    const saveUserHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        changeUser({
            [e.target.name]: e.target.value
        })
    }

    const isAuthUserProfile = authUser.id === user.id

    useEffect(() => {
        setUserInfo(user)
    }, [user.id])


    return (
        <div className="tyn-profile-details">
            <div className="col-12">
                <div className="row gy-4">
                    <div className="col-lg-3">
                        <h6>Personal Information</h6>
                        {isAuthUserProfile && <div className="tyn-subtext">Edit Your personal Info</div>}
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-gs">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">First Name</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="name" placeholder="Your Name" value={userInfo.name} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="surname">Last Name</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="surname" placeholder="Your surname" value={userInfo.surname} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="email" placeholder="Email" value={userInfo.email} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Phone</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="phone" placeholder="Phone" value={userInfo.phone} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <div className="form-control-wrap">
                                        <textarea disabled={!isAuthUserProfile} className="form-control" name="description" placeholder="Description" onChange={changeUserHandler} onBlur={saveUserHandler}>{userInfo.description}</textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="birthday">Birthday</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="date" className="form-control" name="birthday" placeholder="Birthday" value={userInfo.birthday} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="sex">Sex</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="sex" placeholder="Sex" value={userInfo.sex} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="city">City</label>
                                    <div className="form-control-wrap">
                                        <input disabled={!isAuthUserProfile} type="text" className="form-control" name="city" placeholder="City" value={userInfo.city} onChange={changeUserHandler} onBlur={saveUserHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="status_message">Status message</label>
                                    <div className="form-control-wrap">
                                        <textarea disabled={!isAuthUserProfile} className="form-control" name="status_message" placeholder="Status_message" onChange={changeUserHandler} onBlur={saveUserHandler}>{userInfo.status_message}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationForm;