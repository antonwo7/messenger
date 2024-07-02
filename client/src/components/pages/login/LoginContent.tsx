import React from 'react';
import {
    FullLogoImg
} from "../../../components/common/icons"
import {NavLink} from "react-router-dom";
import LoginForm from "./content/LoginForm";
import LoginOther from "./content/LoginOther";

const LoginContent = () => {
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
                            <LoginForm />
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

export default LoginContent;