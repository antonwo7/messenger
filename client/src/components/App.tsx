import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import './../assets/scss/app.scss';
import Nav from "./Nav";
import Chat from "./pages/Chat";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import {AuthService} from "../services/AuthService";
import {authAPI} from "../api/auth";
import {PrivateRoute} from "./ProtectedRoute";

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<PrivateRoute />}>
                    <Route path='/' element={<Chat />} />
                </Route>
                <Route path='/contacts' element={<PrivateRoute />}>
                    <Route path='/contacts' element={<Contacts />} />
                </Route>
                <Route path='/profile' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
            </Routes>
        </>
    )
}

export default App
