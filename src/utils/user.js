export function getTotal(arr) {
	return arr.map((user) => user.accounts.reduce((t, n) => t.balance + n.balance));
}
