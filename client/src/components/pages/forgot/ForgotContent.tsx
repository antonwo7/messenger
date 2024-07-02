import React from 'react';
import {NavLink} from "react-router-dom";
import {FullLogoImg} from "../../common/icons";
import LoginOther from "../login/content/LoginOther";
import ForgotForm from "./content/ForgotForm";

const ForgotContent = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-5 col-md-7 col-sm-9">
                    <div className="my-3 text-center">
                        <NavLink className="tyn-logo tyn-logo-sm" to="/">
                            <FullLogoImg />
                        </NavLink>
                    </div>
                    <div className="card border-0">
                        <div className="p-4">
                            <ForgotForm />
                        </div>
                        <div className="p-4 border-top border-light">
                            <LoginOther />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="small">Don't have an account? <NavLink to={'/register'}>Register</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotContent;