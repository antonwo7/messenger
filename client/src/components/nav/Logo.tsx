import React from 'react';
import {LogoImg} from "../../components/common/icons"

const Logo = () => {
    return (
        <div className="tyn-appbar-logo">
            <a className="tyn-logo" href="/">
                <LogoImg />
            </a>
        </div>
    )
}

export default Logo;