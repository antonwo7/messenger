import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {authAPI} from "../../../../api/auth";
import {useAppSelector} from "../../../../store/hooks";

interface ILoginRequest {
    login: string
    password: string
}

const LoginForm = () => {
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    })

    const [login, {isLoading}] = authAPI.useLoginMutation()

    const authUser = useAppSelector(state => state.auth.authUser)

    const clickHandler = async () => {
        await login(loginData)
    }

    useEffect(() => {
        if (authUser) {
            navigate('/')
        }
    }, [authUser])

    return (
        <>
            <h3>Login</h3>
            <div className="row g-3">
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email-address">Email Address</label>
                        <div className="form-control-wrap">
                            <input
                                onChange={e => setLoginData({...loginData, login: e.target.value})}
                                value={loginData.login}
                                type="text"
                                className="form-control"
                                placeholder="Login"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label d-flex" htmlFor="password">Password
                            <NavLink to={'/forgot'} className="link link-primary ms-auto">Forgot ?</NavLink>
                        </label>
                        <div className="form-control-wrap">
                            <input
                                onChange={e => setLoginData({...loginData, password: e.target.value})}
                                value={loginData.password}
                                type="text"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary w-100"
                        onClick={clickHandler}
                        disabled={isLoading}
                    >Enter</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm;