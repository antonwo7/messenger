import React from 'react';
import ProfileHead from "./ProfileHead";
import ProfileTabs from './ProfileTabs';

const ProfileContent = () => {
    return (
        <div className="tyn-main tyn-content-inner">
            <div className="container">
                <div className="tyn-profile">
                    <ProfileHead />
                    <ProfileTabs />
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;