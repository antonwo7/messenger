import React from 'react';
import {NavLink} from "react-router-dom";

const ForgotForm = () => {
    return (
        <>
            <h3>Recovery Password</h3>
            <div className="row g-3">
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email-address">Email Address</label>
                        <div className="form-control-wrap">
                            <input type="text" className="form-control" id="email-address" placeholder="youremail@example.com" />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <NavLink className="btn btn-primary w-100" to={'/login'}>Reset Password</NavLink>
                </div>
            </div>
        </>
    )
}

export default ForgotForm;