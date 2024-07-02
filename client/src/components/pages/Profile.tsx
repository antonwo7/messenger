import React, {createContext, useEffect} from 'react';
import Nav from "../Nav";
import {userAPI} from "../../api/user";
import {useAppSelector} from "../../store/hooks";
import {INet, IUser, TShortUser} from "../../models/user";
import ProfileContent from "./profile/ProfileContent";
import {ILanguage} from "../../models/common";
import {commonAPI} from "../../api/common";

type TProfileContext = {
    user: IUser | null
    common?: {
        languages: ILanguage[]
        nets: INet[]
    }
    selectUser?: (userId: number) => void
}

export const ProfileContext = createContext<TProfileContext>({
    user: null,
    common: {
        languages: [],
        nets: []
    }
})

const Profile = () => {
    const authUser: TShortUser = useAppSelector(state => state.auth.authUser as TShortUser)
    const {data: user, isLoading, isError, isSuccess} = userAPI.useGetUserQuery(authUser.id)
    const {data: common} = commonAPI.useGetCommonQuery()

    if (isLoading || !user) return <>Loading...</>

    return (
        <>
            <Nav />
            <ProfileContext.Provider value={{user, common}}>
                <div className="tyn-content  tyn-content-page">
                    <ProfileContent />
                </div>
            </ProfileContext.Provider>
        </>
    );
};

export default Profile;