import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {authAPI, IRegistrationRequest} from "../../../../api/auth";

interface IRegisterFormState extends IRegistrationRequest {
    agreement: boolean
}

const RegisterForm = () => {
    const initialData = {
        login: '',
        password: '',
        email: '',
        phone: '',
        agreement: false
    }
    const navigate = useNavigate()
    const [registration, {isSuccess}] = authAPI.useRegistrationMutation()
    const [data, setData] = useState<IRegisterFormState>(initialData)

    const validate = () => {
        return !!data && !!data.password && !!data.login && !!data.email && !!data.phone && data.agreement
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        const field = input.name
        let value = input.value
        const type = input.type

        if (type === 'checkbox') {
            setData({...data, [field]: input.checked})
        } else {
            setData({...data, [field]: value})
        }
    }

    const registerHandler = async () => {
        if (!validate()) return;

        const response = await registration(data as IRegisterFormState)
        if (!('error' in response) && response.data.result) {
            navigate('/login')
        }
    }

    return (
        <>
            <h3>Create Account</h3>
            <div className="row g-3 gx-4">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Login</label>
                        <div className="form-control-wrap">
                            <input type="text" name="login" className="form-control" value={data?.login || ''} onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email-address">Password</label>
                        <div className="form-control-wrap">
                            <input type="password" name="password" className="form-control" value={data?.password || ''} onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Email</label>
                        <div className="form-control-wrap">
                            <input type="email" name="email" className="form-control" value={data?.email || ''} onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email-address">Phone</label>
                        <div className="form-control-wrap">
                            <input type="text" name="phone" className="form-control" value={data?.phone || ''} onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="agreement" checked={data?.agreement} onChange={changeHandler} />
                        <label className="form-check-label" htmlFor="privacy-term-agree"> I agree with <NavLink to={'/'}>privacy policy &amp; terms</NavLink></label>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100" onClick={registerHandler} disabled={!validate()}>Registration</button>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;