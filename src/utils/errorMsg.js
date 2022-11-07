import { useState } from "react";

export default function useMsg() {
	const [msg, setMsg] = useState("");
	const [state, setState] = useState("");

	return {
		set(msg, state) {
			setMsg(msg);

			if (!state) {
				setState("error");
				return;
			}
			setState(state);
		},
		get() {
			return (
				<p
					className={`text-center ${
						state === "error"
							? "text-red-600"
							: state === "warn"
							? "text-yellow-600"
							: state === "success"
							? "text-green-600"
							: "text-black"
					}`}
				>
					{msg}
				</p>
			);
		},
	};
}
