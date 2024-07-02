import React from 'react';
import {
    SearchIcon
} from "../../../common/icons"

const SidebarSearch = () => {
    return (
        <div className="tyn-aside-search">
            <div className="form-group tyn-pill">
                <div className="form-control-wrap">
                    <div className="form-control-icon start">
                        <SearchIcon />
                    </div>
                    <input type="text" className="form-control form-control-solid" placeholder={'Search contact / chat'} />
                </div>
            </div>
        </div>
    )
}

export default SidebarSearch;