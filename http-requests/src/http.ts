export async function fetchAvailablePlaces() {
	const response = await fetch("http://localhost:3000/places");
	const data = await response.json();

	if (!response.ok) {
		throw new Error("Failed to fetch places!");
	}
	return data.places;
}
export async function fetchUserPlaces() {
	const response = await fetch("http://localhost:3000/user-places");
	const resData = await response.json();

	if (!response.ok) {
		throw new Error("Failed to fetch user places");
	}

	return resData.places;
}
export async function updateUserPlaces(places: any[]) {
	const response = await fetch("http://localhost:3000/user-places", {
		method: "PUT",
		body: JSON.stringify({ places }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const resData = await response.json();

	if (!response.ok) {
		throw new Error("Failed to update user data.");
	}

	return resData.message;
}
