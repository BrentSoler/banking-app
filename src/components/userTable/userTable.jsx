import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import useStorage from "../../utils/localStorage";
import { getTotal } from "../../utils/user";

const UserTable = () => {
	const [users, setUsers] = useState();
	const [totalBalance, setTotalBalance] = useState();
	const storage = useStorage();

	const getUsers = useCallback(() => {
		if (!users) {
			setUsers(JSON.parse(storage.get("users")));
		}
		if (users && !totalBalance) {
			setTotalBalance(getTotal(users));
		}
	}, [storage, users, totalBalance]);

	const activate = (name) => {
		const users = JSON.parse(storage.get("users"));

		const userActivate = users.map((user) => {
			if (user.name === name) {
				user.activated = user.activated === true ? false : true;
			}
			return user;
		});

		storage.set("users", userActivate);
		setUsers(null);
	};

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<div className="overflow-x-auto">
			<table className="table w-[70rem] shadow-lg">
				<thead>
					<tr>
						<th>Role</th>
						<th>Name</th>
						<th>Balance</th>
						<th>is Activated</th>
					</tr>
				</thead>
				<tbody>
					{users && totalBalance
						? users.map((user, i) => (
								<tr key={user.name}>
									<th>{user.role}</th>
									<td>{user.name}</td>
									<td>{totalBalance[i].balance ? totalBalance[i].balance : totalBalance[i]}</td>
									<td>
										<input
											type="checkbox"
											checked={user.activated}
											className="checkbox"
											disabled={
												user.name === JSON.parse(storage.get("loggedIn")).name ? true : false
											}
											onClick={() => activate(user.name)}
										/>
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
