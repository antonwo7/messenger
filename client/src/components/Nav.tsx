import React from "react";
import Logo from "./nav/Logo";
import NavLeft from "./nav/NavLeft";
import NavRight from "./nav/NavRight";

const Nav = () => {
    return (
        <nav className="tyn-appbar">
            <div className="tyn-appbar-wrap">
                <Logo />
                <div className="tyn-appbar-content">
                    <NavLeft />
                    <NavRight />
                </div>
            </div>
        </nav>
    )
}

export default Nav