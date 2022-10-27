import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainDashboard from "./pages/MainDashboard";
import RegisterPage from "./pages/RegisterPage";
import Transact from "./pages/Transact";
import More from "./pages/More";
import PayBills from "./pages/PayBills";
import useStorage from "./utils/localStorage";
import ProtectedRoute from "./utils/RouteProtection";

function App() {
	const storage = useStorage();

	const setSeedData = useCallback(() => {
		const users = storage.get("users");

		if (!users) {
			storage.set("users", [
				{ name: "admin", password: "admin", role: "admin", activated: true },
				{ name: "user", password: "user", role: "user", activated: true },
			]);
		}
	}, [storage]);

	useEffect(() => {
		setSeedData();
	}, [setSeedData]);

	return (
		<Router>
			<Routes>
				<Route
					element={<ProtectedRoute value="loggedIn" destination="/dashboard" isReverse={true} />}
				>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>

				<Route element={<ProtectedRoute value="loggedIn" destination="/" isReverse={false} />}>
					<Route path="/dashboard" element={<MainDashboard />} />
				</Route>
				<Route path="/paybills" element={<PayBills />}/>
				<Route path="/transact" element={<Transact />}/>
				<Route path="/more" element={<More />}/>
			</Routes>
		</Router>
	);
}

export default App;
