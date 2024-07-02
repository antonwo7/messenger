import React, {useEffect, useState} from 'react';
import {MoonIcon} from "../../common/icons";
import {authAPI} from "../../../api/auth";

const ProfileModalMode = ({mode}: {mode: number}) => {
    const [changeAuthUser, {}] = authAPI.useChangeUserMutation()

    useEffect(() => {
        document.body.dataset['bsTheme'] = !!mode ? 'dark' : 'light'
    }, [mode])

    const toggleMode = () => {
        changeAuthUser({interface_mode: mode === 1 ? 0 : 1})
    }

    const isDarkMode = mode === 1

    return (
        <div className="d-flex gap gap-2">
            <MoonIcon />
            <div>
                <h6>Darkmode</h6>
                <ul className="d-flex align-items-center gap gap-3">
                    <li className="inline-flex">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="themeMode" id="dark" value="dark" checked={isDarkMode} onChange={toggleMode} />
                            <label className="form-check-label small" htmlFor="dark"> On </label>
                        </div>
                    </li>
                    <li className="inline-flex">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="themeMode" id="light" value="light" checked={!isDarkMode} onChange={toggleMode} />
                            <label className="form-check-label small" htmlFor="light"> Off </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileModalMode;