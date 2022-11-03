import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import useStorage from "../../utils/localStorage";

const UserTable = () => {
	const [users, setUsers] = useState();
	const storage = useStorage();

	const getUsers = useCallback(() => {
		if (!users) {
			setUsers(JSON.parse(storage.get("users")));
		}
	}, [storage, users]);

	const activate = useCallback(
		(name) => {
			const users = JSON.parse(storage.get("users"));

			const userActivate = users.map((user) => {
				if (user.name === name) {
					user.activated = user.activated === true ? false : true;
				}
				return user;
			});

			storage.set("users", userActivate);
			setUsers(null);
			getUsers();
		},
		[storage]
	);

	useEffect(() => {
		getUsers();
	}, [getUsers, activate]);

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
					{users &&
						users.map((user) => (
							<tr key={user.name}>
								<th>{user.role}</th>
								<td>{user.name}</td>
								<td>{user.balance}</td>
								<td>
									<input
										type="checkbox"
										checked={user.activated}
										className="checkbox"
										onClick={() => activate(user.name)}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
