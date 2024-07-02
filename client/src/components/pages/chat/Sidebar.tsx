import React, {useEffect} from 'react';
import PageTitle from "../common/PageTitle";
import SidebarChats from './sidebar/SidebarChats';
import SidebarHead from "./sidebar/SidebarHead";
import SidebarSearch from './sidebar/SidebarSearch';
import {useAppSelector} from "../../../store/hooks";

const Sidebar = () => {
    const conversations = useAppSelector(state => state.message.conversations)

    return (
        <div className="tyn-aside tyn-aside-base">
            <div className="tyn-aside-head">
                <PageTitle title={'Chats'} />
                <SidebarHead />
            </div>
            <div className="tyn-aside-body">
                <SidebarSearch />
                <div className="tab-content">
                    <div className="tab-pane show active">
                        <SidebarChats conversations={conversations}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;