import React from 'react';
import InformationForm from "./information/InformationForm";
import InformationNets from "./information/InformationNets";
import InformationLanguages from "./information/InformationLanguages";

const ProfileInformation = () => {
    return (
        <>
            <InformationForm />
            <InformationNets />
            <InformationLanguages />
        </>
    )
}

export default ProfileInformation;