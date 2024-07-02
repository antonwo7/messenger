import React from 'react';
import {GoogleIcon, FacebookIcon} from "../../../common/icons";

const LoginOther = () => {
    return (
        <>
            <h6 className="tyn-title-overline text-center pb-1">Or Use With</h6>
            <ul className="d-flex gap gap-3">
                <li className="flex-grow-1">
                    <button className="btn btn-light w-100">
                        <GoogleIcon />
                        <span>Google</span>
                    </button>
                </li>
                <li className="flex-grow-1">
                    <button className="btn btn-light w-100">
                        <FacebookIcon />
                        <span>Facebook</span>
                    </button>
                </li>
            </ul>
        </>
    );
};

export default LoginOther;