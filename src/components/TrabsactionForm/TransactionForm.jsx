import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import useMsg from "../../utils/errorMsg";
import handleChange from "../../utils/handleChange";
import useStorage from "../../utils/localStorage";
import { useGetUsers } from "../../utils/user";

export default function TransactionForm() {
	const [senderForm, setSenderForm] = useState({
		name: "",
		account: "",
		amount: "",
	});
	const [reciverForm, setReciverForm] = useState({
		name: "",
		account: "",
	});
	const users = useGetUsers();
	const storage = useStorage();
	const msg = useMsg();

	function sendMoney(e) {
		e.preventDefault();

		if (!senderForm.name || !senderForm.account || !senderForm.amount) {
			msg.set("Missing Feilds in Sender");
			return;
		}

		if (senderForm.name === reciverForm.name) {
			msg.set("You can't send to yourself");
			return;
		}

		if (!reciverForm.name || !reciverForm.account) {
			msg.set("Missing Feilds in Reciver");
			return;
		}

		const numbersOnlyRegex = /^[0-9]*$/;

		if (!senderForm.amount.match(numbersOnlyRegex)) {
			msg.set("Amount shoul only have numbers");
			return;
		}

		const newUser = users.map((user) => {
			if (user.name === senderForm.name) {
				user.accounts.map((account) => {
					if (account.name === senderForm.account) {
						account.balance = account.balance - senderForm.amount;
					}
					return account;
				});
			}

			if (user.name === reciverForm.name) {
				user.accounts.map((account) => {
					if (account.name === reciverForm.account) {
						account.balance = parseInt(account.balance) + parseInt(senderForm.amount);
					}
					return account;
				});
			}

			return user;
		});

		storage.set("users", newUser);

		setSenderForm({
			name: "",
			account: "",
			amount: "",
		});

		setReciverForm({
			name: "",
			account: "",
			amount: "",
		});

		msg.set("");
	}

	return (
		<form onSubmit={sendMoney}>
			<div className="flex justify-center items-center w-[100%] min-h-[95vh] gap-8">
				{/* 
                SENDER FORM
                */}
				<div className="shadow-md p-8 border-2 flex flex-col gap-5 rounded-md w-[30rem]">
					<h1 className="font-bold text-3xl mb-5">Sender</h1>

					<div className="w-full">
						<div className="flex flex-col w-full">
							<label htmlFor="name">Name:</label>
							<select
								className="select w-full"
								id="name"
								name="name"
								onChange={(e) => handleChange(e, setSenderForm)}
								value={senderForm.name}
							>
								<option value="" selected disabled>
									Select a User
								</option>
								{users && users.map((user) => <option value={user.name}>{user.name}</option>)}
							</select>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="account">Account:</label>
							<select
								className="select w-full"
								id="account"
								name="account"
								onChange={(e) => handleChange(e, setSenderForm)}
								value={senderForm.account}
							>
								{senderForm.name && (
									<option value="" selected disabled>
										Select an Account
									</option>
								)}
								{!senderForm.name && (
									<option value="" selected disabled>
										Select a User first
									</option>
								)}
								{users && senderForm.name
									? users.map((user) => {
											if (user.name !== senderForm.name) {
												return null;
											}

											return user.accounts.map((account) => (
												<option value={account.name}>{account.name}</option>
											));
									  })
									: null}
							</select>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="amount">Amount:</label>
							<input
								type="text"
								className="input input-bordered w-full"
								disabled={senderForm.account ? false : true}
								placeholder={senderForm.account ? "Enter an Amount" : "Select an Account first"}
								name="amount"
								value={senderForm.amount}
								onChange={(e) => handleChange(e, setSenderForm)}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center">
					<BsArrowRight className="text-6xl" />
					<button type="submit" className="btn">
						SEND
					</button>
					{msg.get()}
				</div>

				{/* 
                    RECIVER FORM
                */}
				<div className="shadow-md p-8 border-2 flex flex-col gap-5 rounded-md w-[30rem]">
					<h1 className="font-bold text-3xl mb-5">Reciver</h1>

					<div className="w-full">
						<div className="flex flex-col w-full">
							<label htmlFor="name">Name:</label>
							<select
								className="select w-full"
								id="name"
								name="name"
								onChange={(e) => handleChange(e, setReciverForm)}
								value={reciverForm.name}
							>
								<option value="" selected disabled>
									Select a User
								</option>
								{users && users.map((user) => <option value={user.name}>{user.name}</option>)}
							</select>
						</div>
						<div className="flex flex-col w-full">
							<label htmlFor="account">Account:</label>
							<select
								className="select w-full"
								id="account"
								name="account"
								onChange={(e) => handleChange(e, setReciverForm)}
								value={reciverForm.account}
							>
								{reciverForm.name && (
									<option value="" selected disabled>
										Select an Account
									</option>
								)}
								{!reciverForm.name && (
									<option value="" selected disabled>
										Select a User first
									</option>
								)}
								{users && reciverForm.name
									? users.map((user) => {
											if (user.name !== reciverForm.name) {
												return null;
											}

											return user.accounts.map((account) => (
												<option value={account.name}>{account.name}</option>
											));
									  })
									: null}
							</select>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
