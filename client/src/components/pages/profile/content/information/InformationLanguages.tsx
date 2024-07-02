import React, {useContext, useEffect, useState} from 'react';
import {INet, IUser, IUserLanguage, IUserNet, TShortUser} from "../../../../../models/user";
import {CloseIcon, EditIcon, PlusIcon} from "../../../../common/icons";
import {ProfileContext} from "../../../Profile";
import {ILanguage} from "../../../../../models/common";
import {userAPI} from "../../../../../api/user";
import {useAppSelector} from "../../../../../store/hooks";

interface INewLanguage extends Omit<IUserLanguage, 'id'>{}

const InformationLanguages = () => {
    const authUser = useAppSelector(state => state.auth.authUser) as TShortUser
    const {user, common} = useContext(ProfileContext) as {user: IUser, common: any}
    const [languages, setLanguages] = useState<IUserLanguage[]>(user?.languages || [])
    const [addLanguage] = userAPI.useAddLanguageMutation()
    const [deleteLanguage] = userAPI.useDeleteLanguageMutation()
    const [languageAdding, setLanguageAdding] = useState<false | INewLanguage>(false)

    useEffect(() => {
        if (user && 'languages' in user && user.languages !== undefined) {
            setLanguages(user.languages)
        }
    }, [user?.languages])

    const saveLanguageHandler = () => {
        if (!languageAdding || !languageAdding?.lang_id) return;
        addLanguage(languageAdding.lang_id)
        closeLanguageHandler()
    }

    const addLanguageHandler = () => {
        setLanguageAdding({
            lang_id: 0
        })
    }

    const closeLanguageHandler = () => {
        setLanguageAdding(false)
    }

    const deleteLanguageHandler = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.langid === undefined) return;
        deleteLanguage(+e.currentTarget.dataset.langid)
        closeLanguageHandler()
    }

    const changeEditingLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return;
        setLanguageAdding({
            ...languageAdding, lang_id: +e.target.value
        })
    }

    const isAuthUserProfile = authUser.id === user.id

    return (
        <div className="tyn-profile-details mt-3">
            <div className="col-12">
                <div className="row gy-4">
                    <div className="col-lg-3">
                        <h6>Languages</h6>
                        {isAuthUserProfile && <div className="tyn-subtext">Edit Your languages</div>}
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-gs">
                            {languages && languages.map((language) => (
                                <>
                                    <div className="col-lg-10">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <select name="id" className="form-control mr-3" value={language.lang_id} disabled={true}>
                                                    {common?.languages && common.languages.map((commonLanguage: INet) => (
                                                        <option value={commonLanguage.id}>{commonLanguage.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                {isAuthUserProfile && <button className="btn" data-langid={language.id} onClick={deleteLanguageHandler}>
                                                    <CloseIcon />
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                            {languageAdding ? (
                                <>
                                    <div className="col-lg-10">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <select name="id" className="form-control mr-3" onChange={changeEditingLanguageHandler}>
                                                    <option value="0" />
                                                    {common?.languages && common.languages.map((commonLanguage: ILanguage) => (
                                                        <option value={commonLanguage.id}>{commonLanguage.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <button className="btn btn-light" onClick={saveLanguageHandler}>
                                                    <EditIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <button className="btn btn-light btn-inline" onClick={closeLanguageHandler}>
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-lg-1">
                                        <div className="form-group">
                                            {isAuthUserProfile && <button className="btn btn-light" onClick={addLanguageHandler}>
                                                <PlusIcon />
                                            </button>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationLanguages;