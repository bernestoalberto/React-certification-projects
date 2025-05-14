import { redirect } from "react-router-dom";

export function getAuthToken() {
	const token = localStorage.getItem("token");

	if (!token) {
		return null;
	}
	const tokenDuration = getTokenDuration();

	if (tokenDuration && tokenDuration < 0) {
		return "EXPIRED";
	}

	return token;
}

export function getTokenDuration() {
	const storedExpirationDate = localStorage.getItem("expiration");
	const expirationDate = new Date(storedExpirationDate || new Date());
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
}

export function getUserId() {
	const userId = localStorage.getItem("userId");
	return userId;
}
export function getUserEmail() {
	const userEmail = localStorage.getItem("userEmail");
	return userEmail;
}
export function tokenLoader() {
	return getAuthToken();
}

export function checkAuthLoader() {
	// this function will be added in the next lecture
	// make sure it looks like this in the end
	const token = getAuthToken();

	if (!token) {
		return redirect("/auth");
	}

	return null; // this is missing in the next lecture video and should be added by you
}
