import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import ProfileInformation from "./content/ProfileInformation";
import ProfileImages from "./content/ProfileImages";
import ProfileVideo from "./content/ProfileVideo";

const ProfileTabs = () => {
    return (
        <div className="mt-3">
            <Tabs defaultActiveKey="information" className="nav-btns nav-btns-stretch nav-btns-light border-0 no-padding">
                <Tab eventKey="information" title={'Information'}>
                    <ProfileInformation />
                </Tab>
                <Tab eventKey="images" title={'Images'}>
                    <ProfileImages />
                </Tab>
                <Tab eventKey="video" title={'Video'}>
                    <ProfileVideo />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProfileTabs;