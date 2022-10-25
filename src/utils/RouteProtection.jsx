import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useStorage from "./localStorage";

function ProtectedRoute({ value, destination, isReverse }) {
	const storage = useStorage();
	const loggedIn = storage.get(value);

	if (isReverse) {
		return !loggedIn ? <Outlet /> : <Navigate to={destination} />;
	}

	return loggedIn ? <Outlet /> : <Navigate to={destination} />;
}

export default ProtectedRoute;
