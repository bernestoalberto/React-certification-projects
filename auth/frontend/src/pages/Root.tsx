import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation.tsx";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth.ts";

function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}
		if (token === "EXPIRED") {
			localStorage.removeItem("token");
			localStorage.removeItem("expiration");
			localStorage.removeItem("userId");
			localStorage.removeItem("userEmail");
		}
		const tokenDuration = getTokenDuration();

		setTimeout(() => {
			submit(null, { action: "/logout", method: "POST" });
		}, tokenDuration);
	}, [token, submit]);

	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default RootLayout;
