import React, {FC, ReactNode, useEffect} from "react";
import {redirect, Route, Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {AuthService} from "../services/AuthService";
import {authAPI} from "../api/auth";

type PropsWithChildren<P> = P & { children?: ReactNode }

export const PrivateRoute = () => {
    const storageToken = AuthService.getToken() || ''
    const {data, isLoading, isError, isSuccess} = authAPI.useValidateQuery(storageToken)
    const {token, authUser} = useAppSelector(state => state.auth)

    if (isLoading || !authUser) return <>Loading 1</>;

    return token && authUser ? <Outlet /> : <></>;
}