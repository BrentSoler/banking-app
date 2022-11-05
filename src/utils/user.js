import { useCallback, useEffect, useState } from "react";
import useStorage from "./localStorage";

export function getTotal(arr) {
	return arr.map((user) => user.accounts.reduce((t, n) => t.balance + n.balance));
}

export function useGetUsers() {
	const [users, setUsers] = useState();
	const storage = useStorage();

	const getUsers = useCallback(() => {
		if (!users) {
			setUsers(JSON.parse(storage.get("users")));
		}
	}, [storage, users]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return users;
}

export function useLoggedUser() {
	const [user, setUser] = useState();
	const storage = useStorage();

	const getLogged = useCallback(() => {
		if (!user) {
			setUser(JSON.parse(storage.get("loggedIn")));
		}
	}, [user, storage]);

	useEffect(() => {
		getLogged();
	}, [getLogged]);

	return user;
}
