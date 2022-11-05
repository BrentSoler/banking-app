import React, { useCallback, useEffect, useState } from "react";
import "./dashboard.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarContent } from "./SidebarContent";
import { Link, useNavigate } from "react-router-dom";
import useStorage from "../../utils/localStorage";
import { useLoggedUser } from "../../utils/user";

function Navbar() {
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	const user = useLoggedUser();
	const navigate = useNavigate();
	const storage = useStorage();

	function logout() {
		storage.delete("loggedIn");
		navigate("/");
	}

	return (
		<>
			<div className="navbar flex justify-between">
				<div className="flex gap-4 items-center">
					<span className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</span>
					<h1 className="font-bold text-xl">BANKING APP</h1>
				</div>
				<button onClick={logout}>logout</button>
			</div>
			<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
				<ul className="nav-menu-items" onClick={showSidebar}>
					<li className="navbar-close">
						<span className="menu-bars">
							<AiIcons.AiOutlineClose />
						</span>
					</li>
					{user &&
						SidebarContent.map((data, index) => {
							if (user.role === "admin" && data.name === "Pay Bills") {
								return null;
							}

							return (
								<li key={index} className={data.className}>
									<Link to={data.path}>
										{data.icon}
										<span>{data.name}</span>
									</Link>
								</li>
							);
						})}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
