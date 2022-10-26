import React, { useState } from 'react';
import './dashboard.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarContent } from './SidebarContent';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <div className='navbar'>
            <span className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
            </span>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className='navbar-close'>
                    <span className="menu-bars">
                        <AiIcons.AiOutlineClose />
                    </span>
                </li>
                {SidebarContent.map((data, index) => {
                    return (
                        <li key={index} className={data.className}>
                            <a href={data.path}>
                                {data.icon}
                                <span>{data.name}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    )
}

export default Navbar;