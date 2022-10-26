import { useState } from "react";
import handleChange from "../../utils/handleChange";
import { useNavigate } from "react-router-dom";
import useMsg from "../../utils/errorMsg";
import useStorage from "../../utils/localStorage";

const RegisterForm = () => {
	const navigate = useNavigate();
	const storage = useStorage();
	const msg = useMsg();

	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
		confPassword: "",
	});

	function submitHandler(e) {
		e.preventDefault();

		if (!loginData.username || !loginData.password) {
			msg.set("Missing Fields");
			return;
		}

		const user = storage.filter("users", "name", loginData.username);

		if (user.length > 0) {
			msg.set("User already exists");
			return;
		}

		if (loginData.password !== loginData.confPassword) {
			msg.set("Password does not match");
			return;
		}

		storage.add("users", {
			name: loginData.username,
			password: loginData.password,
			role: "user",
			activated: false,
		});

		navigate("/");
	}

	return (
		<form className="flex flex-col" onSubmit={submitHandler}>
			<h1>Username:</h1>
			<input
				type="text"
				name="username"
				autoComplete="off"
				className="input input-bordered"
				value={loginData.username}
				onChange={(e) => handleChange(e, setLoginData)}
			/>
			<h1>Password:</h1>
			<input
				type="password"
				name="password"
				className="input input-bordered"
				value={loginData.password}
				onChange={(e) => handleChange(e, setLoginData)}
			/>
			<h1>Confirm Password:</h1>
			<input
				type="password"
				name="confPassword"
				className="input input-bordered"
				value={loginData.confPassword}
				onChange={(e) => handleChange(e, setLoginData)}
			/>
			{msg.get()}
			<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
				Submit
			</button>
		</form>
	);
};

export default RegisterForm;
