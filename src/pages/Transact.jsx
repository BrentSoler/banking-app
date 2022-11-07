import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import TransactionForm from "../components/TrabsactionForm/TransactionForm";
import DepositForm from "../components/DepositForm/DepositForm";
import WithdrawForm from "../components/WithdrawForm/WithdrawForm";

const Transact = () => {
	const [activeTab, setActiveTab] = useState("Transfer");

	return (
		<>
			<Navbar />
			<div className="flex flex-col justify-center items-center mt-8">
				<div className="tabs">
					<button
						className={`tab  text-xl transition-all tab-lifted ${
							activeTab === "Transfer" ? "tab-active font-bold" : "font-normal"
						}`}
						onClick={() => setActiveTab("Transfer")}
					>
						Transfer
					</button>
					<button
						className={`tab  text-xl transition-all tab-lifted ${
							activeTab === "Withdraw" ? "tab-active font-bold" : "font-normal"
						}`}
						onClick={() => setActiveTab("Withdraw")}
					>
						Withdraw
					</button>
					<button
						className={`tab  text-xl transition-all tab-lifted ${
							activeTab === "Deposit" ? "tab-active font-bold" : "font-normal"
						}`}
						onClick={() => setActiveTab("Deposit")}
					>
						Deposit
					</button>
				</div>
				{activeTab === "Transfer" && <TransactionForm />}
				{activeTab === "Deposit" && <DepositForm />}
				{activeTab === "Withdraw" && <WithdrawForm />}
			</div>
		</>
	);
};

export default Transact;
