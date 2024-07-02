import React from 'react';
import {NavLink} from "react-router-dom";
import {FullLogoImg} from "../../common/icons";
import RegisterForm from "./content/RegisterForm";

const RegisterContent = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8">
                    <div className="my-3 text-center">
                        <NavLink className="tyn-logo tyn-logo-sm" to="/">
                            <FullLogoImg />
                        </NavLink>
                    </div>
                    <div className="card border-0">
                        <div className="p-4">
                            <RegisterForm />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="small">Some how remembered? <NavLink to={'/login'}>Login</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterContent;