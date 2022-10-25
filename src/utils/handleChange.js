export default function handleChange(e, callback) {
	callback((prevData) => ({
		...prevData,
		[e.target.name]: e.target.value,
	}));
}
