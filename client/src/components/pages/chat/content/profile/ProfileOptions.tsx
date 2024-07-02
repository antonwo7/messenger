import React, {useContext} from 'react';
import OptionsCustomize from "./options/OptionsCustomize";
import OptionsManage from "./options/OptionsManage";
import {ChatContext} from "../ChatProfile";

const ProfileOptions = () => {
    const chatContext = useContext(ChatContext)

    return (
        <div className="mt-3">
            <ul className="nav nav-tabs mb-4">
                {/*<li className="nav-item">*/}
                {/*    <button className="nav-link active" type="button"> Customize</button>*/}
                {/*</li>*/}
                <li className="nav-item">
                    <button className="nav-link active" type="button"> Manage</button>
                </li>
            </ul>
            {/*<OptionsCustomize />*/}
            <OptionsManage />
        </div>
    )
}

export default ProfileOptions;