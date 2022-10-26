export default function useStorage() {
	return {
		get(key) {
			return localStorage.getItem(key);
		},
		set(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		add(key, value) {
			localStorage.setItem(key, JSON.stringify([...JSON.parse(localStorage.getItem(key)), value]));
		},
		filter(key, search, value) {
			const users = JSON.parse(localStorage.getItem(key));

			if (!users) {
				return null;
			}

			const filteredUser = users.filter((user) => value === user[search]);

			return filteredUser;
		},
	};
}
