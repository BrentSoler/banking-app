import React from 'react';
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

export const SidebarContent = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        name: 'Transact',
        path: '/transact',
        icon: <MdIcons.MdOutlineLoop />,
        className: 'nav-text'
    },
    {
        name: 'Pay Bills',
        path: '/paybills',
        icon: <MdIcons.MdOutlinePayments />,
        className: 'nav-text'
    },
    {
        name: 'More',
        path: '/more',
        icon: <MdIcons.MdOutlineMoreHoriz />,
        className: 'nav-text'
    },
]